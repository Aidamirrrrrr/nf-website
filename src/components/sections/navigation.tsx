"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n, type Locale } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";
import { Logo } from "@/components/logo";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const { locale, t, setLocale } = useI18n();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Detect dark-background sections via data-nav-theme="dark"
  useEffect(() => {
    const darkSections = document.querySelectorAll<HTMLElement>(
      '[data-nav-theme="dark"]',
    );
    if (!darkSections.length) return;

    const activeDark = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeDark.add(entry.target);
          } else {
            activeDark.delete(entry.target);
          }
        }
        setIsDark(activeDark.size > 0);
      },
      {
        rootMargin: "0px 0px -95% 0px", // only top ~5% of viewport
      },
    );

    for (const el of darkSections) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const menuIsDark = mobileOpen || isDark;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          mobileOpen
            ? "bg-neutral-950"
            : scrolled
              ? isDark
                ? "bg-neutral-950 backdrop-blur-xl border-b border-white/5"
                : "bg-white/80 backdrop-blur-xl border-b border-neutral-200/50"
              : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <a
            href="#"
            className="inline-flex"
            onClick={() => setMobileOpen(false)}
          >
            <Logo variant={menuIsDark ? "dark" : "light"} />
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`group relative text-sm font-medium transition-colors duration-500 ${
                  isDark
                    ? "text-neutral-400 hover:text-white"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                <LocaleTransition className="inline">
                  {item.name}
                </LocaleTransition>
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    isDark ? "bg-white" : "bg-black"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
              className={`font-mono text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${
                menuIsDark
                  ? "text-neutral-500 hover:text-white"
                  : "text-neutral-400 hover:text-black"
              }`}
            >
              {locale === "ru" ? "EN" : "RU"}
            </button>
            <a
              href="#contact"
              className={`hidden items-center gap-1.5 text-sm font-medium transition-all duration-500 md:inline-flex ${
                isDark
                  ? "text-white hover:opacity-60"
                  : "text-black hover:opacity-60"
              }`}
            >
              <LocaleTransition className="inline">
                {t.nav.cta}
              </LocaleTransition>
              <span className="leading-none">&rarr;</span>
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative flex h-8 w-8 items-center justify-center md:hidden"
              aria-label="Menu"
            >
              <motion.span
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 0 : -4,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute h-px w-5 ${menuIsDark ? "bg-white" : "bg-black"}`}
              />
              <motion.span
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? 0 : 4,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute h-px w-5 ${menuIsDark ? "bg-white" : "bg-black"}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-neutral-950 pt-24 px-6 pb-12 md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="py-3 text-3xl font-bold text-white transition-colors hover:text-neutral-400"
                >
                  <LocaleTransition className="inline">
                    {item.name}
                  </LocaleTransition>
                </motion.a>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black"
            >
              <LocaleTransition className="inline">
                {t.nav.cta}
              </LocaleTransition>
              <span>&rarr;</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
