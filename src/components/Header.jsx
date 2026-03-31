import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: 'HOME', href: '/', isHome: true },
    { title: 'PROJECTEN', href: '/#projecten' },
    { title: 'OVER MIJ', href: '/#over-mij' },
    { title: 'REVIEWS', href: '/#reviews' },
    { title: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top bar with contact info - dark bg like design */}
      <div className="bg-[#efefef] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center h-8 space-x-6 text-xs font-medium">
          <a href="mailto:info@duiftegelwerken.nl" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/at-solid-full.svg" alt="" className="w-3 h-3 mr-2 invert" />
            INFO@DUIFTEGELWERKEN.NL
          </a>
          <a href="tel:0625123794" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/phone-solid-full.svg" alt="" className="w-3 h-3 mr-2 invert" />
            06 - 25 12 3794
          </a>
        </div>
      </div>

      {/* Main navigation bar - white bg */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="bg-white flex-shrink-0 flex items-center -mt-10">
              <a href="/" className="flex items-center">
                <img src="/Transparant.svg" alt="Duif Tegelwerken" className="h-[100px] w-auto" />
              </a>
            </div>
            <nav className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="font-[playfair-display] font-[900] rounded-lg text-lg hover:bg-[#efefef] transition-all duration-300 ease-in-out flex items-center py-2 px-6"
                >
                  {link.isHome ? (
                    <img src="/house-regular-full.svg" alt="Home" className="w-5 h-5" />
                  ) : (
                    link.title
                  )}
                </a>
              ))}

              <a href="/contact" className="hidden lg:flex items-center bg-brand-black text-white px-5 py-2.5 font-semibold text-sm rounded-sm hover:opacity-90 transition-opacity">
                Direct contact opnemen
                <img src="/pigeon-svg.svg" alt="" className="ml-2 w-4 h-4 invert" />
              </a>
            </nav>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black flex items-center font-bold font-playfair tracking-widest"
                aria-expanded={isOpen}
              >
                MENU
                {isOpen ? <X className="ml-2 h-6 w-6" /> : <Menu className="ml-2 h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-gray-100 h-screen flex flex-col pt-8 z-20">
          <div className="px-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-lg font-bold font-playfair tracking-widest text-black hover:bg-gray-50"
              >
                {link.isHome ? (
                  <img src="/house-regular-full.svg" alt="Home" className="w-6 h-6" />
                ) : (
                  link.title
                )}
              </a>
            ))}
            <div className="pt-4">
              <a href="/contact" className="flex items-center justify-center w-full bg-brand-black text-white px-6 py-3 font-semibold text-sm rounded-sm">
                Direct contact opnemen
                <img src="/pigeon-svg.svg" alt="" className="ml-2 w-4 h-4 invert" />
              </a>
            </div>

            <div className="border border-gray-200 p-6 mt-6">
              <h3 className="font-[900] tracking-widest mb-4">BEL OF MAIL</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <img src="/phone-solid-full.svg" alt="" className="w-4 h-4 mr-3" />
                  <a href="tel:0625123794" className="hover:underline">06 - 25 12 3794</a>
                </div>
                <div className="flex items-center">
                  <img src="/at-solid-full.svg" alt="" className="w-4 h-4 mr-3" />
                  <a href="mailto:info@duiftegelwerken.nl" className="hover:underline">INFO@DUIFTEGELWERKEN.NL</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
