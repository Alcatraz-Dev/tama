import Link from "next/link";
import React from "react";

const footerLinks = {
  // Services: [
  //   { name: "1on1 Coaching", href: "#" },
  //   { name: "Company Review", href: "#" },
  //   { name: "Accounts Review", href: "#" },
  //   { name: "HR Consulting", href: "#" },
  //   { name: "SEO Optimisation", href: "#" },
  // ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Meet the Team", href: "#" },
    { name: "Careers", href: "#" },
  ],
  "Helpful Links": [
    { name: "Contact", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Live Chat", href: "#" },
  ],
  Legal: [
    { name: "Accessibility", href: "#" },
    { name: "Returns Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: "M22 12c0-5.523..." },
  { name: "Instagram", href: "#", icon: "M12.315 2c2.43..." },
  { name: "Twitter", href: "#", icon: "M8.29 20.251..." },
  { name: "GitHub", href: "#", icon: "M12 2C6.477 2..." },
];

function Footer() {
  return (
    <footer className="bg-black/90 w-full max-w-7xl mx-auto px-6 py-12 rounded-3xl mb-6">
      <div className="mx-auto max-w-screen-xl space-y-10 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Logo + About */}
          <div>
            <Link
              href="/"
              className="text-4xl font-extrabold uppercase tracking-wide text-white"
            >
              Tama
            </Link>

            <p className="mt-4 max-w-xs text-gray-300 text-sm leading-relaxed">
              Premium clothing brand for modern lifestyle. Crafted with passion,
              designed for comfort.
            </p>

            {/* Social Icons */}
            <ul className="mt-8 flex gap-6">
              {socialLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <span className="sr-only">{item.name}</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{
                        __html: `<path d="${item.icon}"/>`,
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-2 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="font-medium text-white">{section}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Tama Clothing. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2 sm:mt-0">
            Made with ❤️ for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;