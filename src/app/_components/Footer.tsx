"use client";

import React from "react";
import { motion } from "framer-motion";

function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Preise", href: "#price" },
      { name: "Tutorial", href: "#tutorial" },
      { name: "API", href: "#api" },
    ],
    company: [
      { name: "Über uns", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Karriere", href: "/careers" },
      { name: "Kontakt", href: "/contact" },
    ],
    legal: [
      { name: "Datenschutz", href: "/privacy" },
      { name: "AGB", href: "/terms" },
      { name: "Impressum", href: "/imprint" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-base-100 relative border-t border-white/10">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF705B]/5 to-[#FFB457]/5"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF705B] to-[#FFB457]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="fill-white"
                >
                  <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-base-content text-xl font-bold">
                  Crack
                  <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
                    The
                  </span>
                  Test
                </h3>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base-content/70 max-w-md text-sm"
            >
              KI-gestützte Testgenerierung für Unternehmen und
              Bildungseinrichtungen. Erstelle präzise Eignungstests in Sekunden.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-4 pt-4"
            >
              {[
                {
                  icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                  name: "Twitter",
                },
                {
                  icon: "M20.317 4.37l-8.317 8.628-8.317-8.628 8.317-8.37 8.317 8.37z",
                  name: "LinkedIn",
                },
                {
                  icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
                  name: "Facebook",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-base-200/40 text-base-content/70 hover:bg-base-200/60 hover:text-base-content flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition hover:border-orange-300/30"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d={social.icon}></path>
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Links grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-base-content text-sm font-semibold">
                  Produkt
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-base-content/70 hover:text-base-content text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 md:mt-0"
              >
                <h3 className="text-base-content text-sm font-semibold">
                  Unternehmen
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-base-content/70 hover:text-base-content text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="md:grid md:grid-cols-1 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-base-content text-sm font-semibold">
                  Rechtliches
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-base-content/70 hover:text-base-content text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-base-content/60 text-sm">
              © {new Date().getFullYear()} CrackTheTest.ai. Alle Rechte
              vorbehalten.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
