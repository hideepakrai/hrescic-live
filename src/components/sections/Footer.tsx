"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/* ---------- REUSABLE COMPONENTS ---------- */

const FooterHeading: React.FC<{ title: string }> = ({ title }) => (
  <h4 className="text-white text-lg font-semibold mb-5 tracking-tight">
    {title}
  </h4>
);

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <li>
    <a
      href={href}
      className="hover:text-white transition-colors duration-300 text-base"
    >
      {children}
    </a>
  </li>
);

const SocialIcon: React.FC<{
  icon: React.ElementType;
  href: string;
  name: string;
}> = ({ icon: Icon, href, name }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#37c100] hover:border-[#37c100] hover:scale-110 transition-all duration-300 group"
    aria-label={name}
  >
    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
  </a>
);

/* ---------- FOOTER ---------- */

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Explore links
  const exploreLinks = [
    { label: t("nav.what_we_do"), href: "/what-we-do" },
    { label: t("nav.who_we_create_for"), href: "/who-we-create-for" },
    { label: t("nav.ideas_insights"), href: "/Ideas-Insights" },
    { label: t("nav.lets_talk"), href: "/lets-talk" },
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
    { icon: Linkedin,  href: "https://www.linkedin.com/in/tea-hre%C5%A1%C4%8Di%C4%87/", target: "_blank", name: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/hrescic_agency/", target: "_blank", name: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100070323768269", target: "_blank", name: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/@hrescic", target: "_blank", name: "YouTube" },
  ];

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  if (!mounted) {
    return <footer className="relative bg-[#0F172A] pt-20 pb-10 overflow-hidden font-sans text-slate-300" />;
  }

  return (
    <footer className="relative bg-[#0F172A] pt-20 pb-10 overflow-hidden font-sans text-slate-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#37c100]/20 to-transparent" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#37c100]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#37c100]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Explore */}
          <div>
            <FooterHeading title={t("footer.explore")} />
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
            <FooterHeading title={t("footer.connect")} />
            <ul className="space-y-3">
              {connectDetails.map((item) => (
                <li key={item.value}>
                  <a
                    href={item.href}
                    className="flex items-start gap-3 group hover:text-white transition-colors duration-300"
                  >
                    <item.icon className="w-5 h-5 mt-0.5 text-[#37c100] group-hover:scale-110 transition-transform" />
                    <span className="text-base">{item.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <FooterHeading title={t("footer.follow")} />
            <div className="flex gap-4">
              {socialIcons.map((social) => (
                <SocialIcon
                  key={social.name}
                  icon={social.icon}
                  href={social.href}
                  name={social.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-300/80">
          <div className="flex flex-col gap-1">
            <p className="text-base font-normal italic">
              {t("footer.rights")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs md:text-sm">
            <p className="text-[#37c100] font-medium leading-relaxed max-w-xs text-center md:text-right">
              {t("footer.made_with")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
