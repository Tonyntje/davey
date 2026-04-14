<?php
// ============================================================
// Duif Tegelwerken — Contact Form Handler
// ============================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://duiftegelwerken.nl');
header('Access-Control-Allow-Methods: POST');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot check (spam bot trap)
if (!empty($_POST['website'])) {
    // Bot filled in the hidden field
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit;
}

// Rate limiting (simple, based on session)
session_start();
$now = time();
$cooldown = 60; // seconds between submissions
if (isset($_SESSION['last_submit']) && ($now - $_SESSION['last_submit']) < $cooldown) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Wacht even voordat u opnieuw een bericht stuurt.']);
    exit;
}

// ── Config ──────────────────────────────────────────────────
$to      = 'davey@duiftegelwerken.nl';
$subject_prefix = 'Nieuw bericht via website';

// ── Determine form type ─────────────────────────────────────
$formType = isset($_POST['form_type']) ? $_POST['form_type'] : 'contact';

if ($formType === 'footer') {
    // Footer form — only has contact info
    $contact = trim($_POST['contact'] ?? '');

    if (empty($contact)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Vul uw contactgegevens in.']);
        exit;
    }

    $contact = htmlspecialchars($contact, ENT_QUOTES, 'UTF-8');
    $subject = "$subject_prefix — Terugbelverzoek";
    $body    = "Nieuw terugbelverzoek via de website:\n\n";
    $body   .= "Contactgegevens: $contact\n\n";
    $body   .= "---\nVerzonden op: " . date('d-m-Y H:i') . "\n";
    $replyTo = filter_var($contact, FILTER_VALIDATE_EMAIL) ? $contact : $to;

} else {
    // Contact page form — has name, email, message
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validate
    $errors = [];
    if (empty($name))    $errors[] = 'Naam is verplicht.';
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Geldig e-mailadres is verplicht.';
    if (empty($message)) $errors[] = 'Bericht is verplicht.';

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
        exit;
    }

    // Sanitize
    $name    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

    $subject = "$subject_prefix — $name";
    $body    = "Nieuw bericht via het contactformulier:\n\n";
    $body   .= "Naam:    $name\n";
    $body   .= "Email:   $email\n\n";
    $body   .= "Bericht:\n$message\n\n";
    $body   .= "---\nVerzonden op: " . date('d-m-Y H:i') . "\n";
    $replyTo = $email;
}

// ── Send email ──────────────────────────────────────────────
$headers  = "From: noreply@duiftegelwerken.nl\r\n";
$headers .= "Reply-To: $replyTo\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: DuifTegelwerken/1.0\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    $_SESSION['last_submit'] = $now;
    echo json_encode(['success' => true, 'message' => 'Bedankt! Uw bericht is verzonden.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.']);
}
