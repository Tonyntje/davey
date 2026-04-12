import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { title: 'HOME', href: '/', isHome: true },
    { title: 'PROJECTEN', href: '/gallerij' },
    { title: 'OVER MIJ', href: '/over-mij' },
    { title: 'REVIEWS', href: '/#reviews' },
    { title: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-50" role="banner">
      {/* Top bar with contact info */}
      <div className="bg-[#efefef]" aria-label="Contactgegevens">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center h-8 space-x-6 text-xs font-medium">
          <a href="mailto:info@duiftegelwerken.nl" className="flex items-center hover:opacity-80 transition-opacity" aria-label="E-mail: info@duiftegelwerken.nl">
            <img src="/at-solid-full.svg" alt="" className="w-3 h-3 mr-2" aria-hidden="true" />
            <span>INFO@DUIFTEGELWERKEN.NL</span>
          </a>
          <a href="tel:0625123794" className="flex items-center hover:opacity-80 transition-opacity" aria-label="Bel ons: 06 25 12 3794">
            <img src="/phone-solid-full.svg" alt="" className="w-3 h-3 mr-2" aria-hidden="true" />
            <span>06 - 25 12 3794</span>
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="bg-white flex-shrink-0 flex items-center -mt-10">
              <a href="/" className="flex items-center" aria-label="Duif Tegelwerken — naar homepagina">
                <img src="/Transparant.svg" alt="Duif Tegelwerken logo" className="h-[100px] w-auto" width="160" height="100" />
              </a>
            </div>
            <nav className="hidden md:flex items-center" aria-label="Hoofdnavigatie">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="font-[playfair-display] font-[900] rounded-lg text-lg hover:bg-[#efefef] transition-all duration-300 ease-in-out flex items-center py-2 px-6"
                  aria-label={link.isHome ? 'Home' : undefined}
                  aria-current={typeof window !== 'undefined' && window.location.pathname === link.href ? 'page' : undefined}
                >
                  {link.isHome ? (
                    <img src="/house-regular-full.svg" alt="" className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    link.title
                  )}
                </a>
              ))}

              <a href="/contact" className="hidden lg:flex items-center bg-brand-black text-white px-5 py-2.5 font-semibold text-sm rounded-sm hover:opacity-90 transition-opacity">
                Direct contact opnemen
                <img src="/pigeon-svg.svg" alt="" className="ml-2 w-4 h-4 invert" aria-hidden="true" />
              </a>
            </nav>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black flex items-center font-bold font-playfair tracking-widest"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Sluit menu' : 'Open menu'}
              >
                <span>MENU</span>
                {isOpen ? <X className="ml-2 h-6 w-6" aria-hidden="true" /> : <Menu className="ml-2 h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-gray-100 h-screen flex flex-col pt-8 z-20"
          role="dialog"
          aria-modal="true"
          aria-label="Mobiel navigatiemenu"
        >
          <nav className="px-6 flex flex-col space-y-2" aria-label="Mobiele navigatie">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-lg font-bold font-playfair tracking-widest text-black hover:bg-gray-50"
                aria-label={link.isHome ? 'Home' : undefined}
              >
                {link.isHome ? (
                  <img src="/house-regular-full.svg" alt="" className="w-6 h-6" aria-hidden="true" />
                ) : (
                  link.title
                )}
              </a>
            ))}
            <div className="pt-4">
              <a href="/contact" className="flex items-center justify-center w-full bg-brand-black text-white px-6 py-3 font-semibold text-sm rounded-sm">
                Direct contact opnemen
                <img src="/pigeon-svg.svg" alt="" className="ml-2 w-4 h-4 invert" aria-hidden="true" />
              </a>
            </div>

            <div className="border border-gray-200 p-6 mt-6">
              <h3 className="font-[900] tracking-widest mb-4">BEL OF MAIL</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <img src="/phone-solid-full.svg" alt="" className="w-4 h-4 mr-3" aria-hidden="true" />
                  <a href="tel:0625123794" className="hover:underline">06 - 25 12 3794</a>
                </div>
                <div className="flex items-center">
                  <img src="/at-solid-full.svg" alt="" className="w-4 h-4 mr-3" aria-hidden="true" />
                  <a href="mailto:info@duiftegelwerken.nl" className="hover:underline">INFO@DUIFTEGELWERKEN.NL</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
