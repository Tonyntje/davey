import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// Rate limiting (in-memory, resets on server restart)
const submissions = new Map<string, number>();
const COOLDOWN_MS = 60_000;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const formData = await request.formData();

    // Honeypot check
    if (formData.get('website')) {
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const lastSubmit = submissions.get(ip);
    if (lastSubmit && Date.now() - lastSubmit < COOLDOWN_MS) {
      return new Response(
        JSON.stringify({ success: false, error: 'Wacht even voordat u opnieuw een bericht stuurt.' }),
        { status: 429, headers }
      );
    }

    const formType = formData.get('form_type') as string;
    let subject: string;
    let body: string;
    let replyTo: string;

    const to = process.env.MAIL_TO || 'davey@duiftegelwerken.nl';

    if (formType === 'footer') {
      const contact = (formData.get('contact') as string)?.trim();
      if (!contact) {
        return new Response(
          JSON.stringify({ success: false, error: 'Vul uw contactgegevens in.' }),
          { status: 400, headers }
        );
      }

      subject = 'Nieuw terugbelverzoek via website';
      body = `Nieuw terugbelverzoek via de website:\n\nContactgegevens: ${contact}\n\n---\nVerzonden op: ${new Date().toLocaleString('nl-NL')}`;
      replyTo = contact.includes('@') ? contact : to;
    } else {
      const name = (formData.get('name') as string)?.trim();
      const email = (formData.get('email') as string)?.trim();
      const message = (formData.get('message') as string)?.trim();

      const errors: string[] = [];
      if (!name) errors.push('Naam is verplicht.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Geldig e-mailadres is verplicht.');
      if (!message) errors.push('Bericht is verplicht.');

      if (errors.length) {
        return new Response(
          JSON.stringify({ success: false, error: errors.join(' ') }),
          { status: 400, headers }
        );
      }

      subject = `Nieuw bericht via website — ${name}`;
      body = [
        'Nieuw bericht via het contactformulier:',
        '',
        `Naam:    ${name}`,
        `Email:   ${email}`,
        '',
        'Bericht:',
        message,
        '',
        '---',
        `Verzonden op: ${new Date().toLocaleString('nl-NL')}`,
      ].join('\n');
      replyTo = email!;
    }

    // Create SMTP transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"Duif Tegelwerken Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo,
      subject,
      text: body,
    });

    submissions.set(ip, Date.now());

    return new Response(
      JSON.stringify({ success: true, message: 'Bedankt! Uw bericht is verzonden.' }),
      { headers }
    );
  } catch (err) {
    console.error('Mail error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.' }),
      { status: 500, headers }
    );
  }
};
