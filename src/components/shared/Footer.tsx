"use client";
import { motion } from "motion/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaApple,
  FaGooglePlay,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand & Social */}
          <div>
            <h2 className="text-2xl font-bold tracking-wide">RideVo</h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Connecting riders and drivers seamlessly. Safe, reliable, and
              affordable rides at your fingertips.
            </p>
            <div className="flex gap-4 mt-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold tracking-wide mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["How it works", "Find a ride", "Offer a ride", "Cities", "Safety"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3 - Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold tracking-wide mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {["Help Center", "Community Guidelines", "Insurance", "Blog", "Careers"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
            <div className="mt-6">
              <h3 className="text-lg font-semibold tracking-wide mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Column 4 - Newsletter & App Download */}
          <div>
            <h3 className="text-lg font-semibold tracking-wide mb-5">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest news and exclusive offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <h3 className="text-lg font-semibold tracking-wide mb-4">
              Download the App
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 rounded-lg px-4 py-2.5 transition-colors duration-200 border border-gray-800"
              >
                <FaApple size={24} />
                <div>
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 rounded-lg px-4 py-2.5 transition-colors duration-200 border border-gray-800"
              >
                <FaGooglePlay size={22} />
                <div>
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} RideVo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;