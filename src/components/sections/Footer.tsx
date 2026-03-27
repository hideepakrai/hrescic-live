"use client";

import React from "react";
import {
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Youtube,
  Facebook,
} from "lucide-react";

/* ---------- DATA ---------- */

// Explore links
const exploreLinks = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "Who We Create For", href: "/who-we-create-for" },
  { label: "Ideas & Insights", href: "/Ideas-Insights" },
  { label: "Let’s Talk", href: "/lets-talk" },
];

// Connect details
const connectDetails = [
  {
    icon: Mail,
    value: "tea@hrescic.com",
    href: "mailto:tea@hrescic.com",
  },
  {
    icon: Phone,
    value: "+385 99 686 1721",
    href: "tel:+385996861721",
  },
  {
    icon: MapPin,
    value: "Samobor, Croatia",
    href: "#",
  },
];

// Social icons
const socialIcons = [
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Youtube, href: "#", name: "YouTube" },
];

/* ---------- REUSABLE COMPONENTS ---------- */

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="hover:text-white transition-colors duration-300 text-base"
    >
      {children}
    </a>
  </li>
);

interface FooterHeadingProps {
  title: string;
}

const FooterHeading: React.FC<FooterHeadingProps> = ({ title }) => (
  <h6 className="text-white mb-6 flex items-center text-lg font-semibold">
    {title}
  </h6>
);

/* ---------- FOOTER ---------- */

const Footer: React.FC = () => {
  return (
    <footer className="text-slate-200 pt-16 pb-8 bg-[#26353F]">


      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">


        <div className="mb-10">
          <img src="../assets/Image/hrescic-logo-white.svg"></img>
        </div>
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Explore */}
          <div>
            <FooterHeading title="Explore" />
            <ul className="space-y-1.5">
              {exploreLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <FooterHeading title="Connect" />
            <ul className="space-y-3">
              {connectDetails.map((item) => (
                <li key={item.value}>
                  <a
                    href={item.href}
                    className="flex items-start hover:text-white transition-colors text-base"
                  >
                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{item.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <FooterHeading title="Follow" />
            <div className="flex gap-4">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-slate-300/80 hover:text-white transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-300/80">
          <div className="flex flex-col gap-1">
            <p className="text-base font-normal italic">
              © 2026 Hreščić.com. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs md:text-sm">
            <p className="text-base italic font-normal">
              Made with strategy, storytelling &amp; strong coffee in Samobor. ☕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
