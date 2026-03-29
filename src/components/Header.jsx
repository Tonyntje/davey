import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Load initial theme
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { title: 'HOME', href: '/' },
    { title: 'PROJECTEN', href: '/#projecten' },
    { title: 'OVER MIJ', href: '/#over-mij' },
    { title: 'REVIEWS', href: '/#reviews' },
    { title: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex flex-col items-center">
              <div className="flex space-x-2">
                {/* Pigeon SVG placeholders */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white">
                  <path d="M12 2C8 2 5 5 5 9c0 1.25.32 2.42.88 3.42C7 14.5 9 17 12 21c3-4 5-6.5 6.12-8.58C18.68 11.42 19 10.25 19 9c0-4-3-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
                <div className="border border-black dark:border-white w-8 h-8 flex flex-wrap content-between p-0.5">
                    <span className="w-3 h-3 border border-black dark:border-white"></span>
                    <span className="w-3 h-3 border border-black dark:border-white"></span>
                    <span className="w-3 h-3 border border-black dark:border-white"></span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white transform scale-x-[-1]">
                  <path d="M12 2C8 2 5 5 5 9c0 1.25.32 2.42.88 3.42C7 14.5 9 17 12 21c3-4 5-6.5 6.12-8.58C18.68 11.42 19 10.25 19 9c0-4-3-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
              </div>
              <span className="font-playfair font-black text-sm tracking-widest mt-1 text-black dark:text-white uppercase leading-none">
                 DUIF TEGELWERKEN
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                className="text-sm font-bold tracking-widest text-[#1a1a1a] dark:text-gray-200 hover:text-gray-600 dark:hover:text-white"
              >
                {link.title}
              </a>
            ))}
            
            <button 
              onClick={toggleTheme} 
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
            </button>
            <a href="/contact" className="hidden lg:flex items-center bg-brand-black text-white dark:bg-white dark:text-brand-black px-6 py-3 font-semibold text-sm rounded-sm hover:opacity-90 transition-opacity">
              Direct contact opnemen <ArrowRight size={16} className="ml-2" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={toggleTheme} 
              className="p-2 text-gray-500"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-400" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black dark:text-white flex items-center font-bold font-playfair tracking-widest"
              aria-expanded="false"
            >
              MENU
              {isOpen ? <X className="ml-2 h-6 w-6" /> : <Menu className="ml-2 h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 w-full shadow-xl border-t border-gray-100 dark:border-gray-800 h-screen flex flex-col pt-8">
          <div className="px-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xl font-bold font-playfair tracking-widest text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {link.title}
              </a>
            ))}
            <div className="pt-6">
                <a href="/contact" className="flex items-center justify-center w-full bg-brand-black text-white dark:bg-white dark:text-brand-black px-6 py-4 font-semibold text-sm rounded-sm">
                 Direct contact opnemen <ArrowRight size={16} className="ml-2" />
               </a>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 p-6 mt-8">
               <h3 className="font-playfair font-bold tracking-widest mb-4 dark:text-white">BEL OF MAIL</h3>
               <div className="space-y-4 text-sm dark:text-gray-300">
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">📞</span>
                    <a href="tel:0625123794" className="hover:underline">06 - 25 12 3794</a>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">📧</span>
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
