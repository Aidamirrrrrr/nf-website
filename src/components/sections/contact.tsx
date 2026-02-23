"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";
import { Logo } from "@/components/logo";

const footerLinks = [
  { labelRu: "О нас", labelEn: "About", href: "#about" },
  { labelRu: "Услуги", labelEn: "Services", href: "#services" },
  { labelRu: "Работы", labelEn: "Work", href: "#work" },
];

/* ── Magnetic link component ── */
function MagneticLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ── Floating input field ── */
function FloatingField({
  label,
  type = "text",
  required = true,
  value,
  onChange,
  index,
  isInView,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  index: number;
  isInView: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const isActive = focused || value.length > 0;
  const isEmpty = touched && required && value.trim().length === 0;
  const isInvalidEmail =
    touched &&
    type === "email" &&
    value.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
      className="group relative"
    >
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
        className={`peer w-full border-b-2 bg-transparent pb-2 pt-6 text-sm text-white outline-none transition-all duration-300 ${
          isEmpty || isInvalidEmail
            ? "border-red-400"
            : focused
              ? "border-white"
              : "border-neutral-700 hover:border-neutral-500"
        }`}
      />
      <span
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          isActive ? "top-0 text-[11px] tracking-wider" : "top-5 text-sm"
        } ${
          isEmpty || isInvalidEmail
            ? "text-red-400"
            : focused
              ? "text-white"
              : "text-neutral-500"
        }`}
      >
        {label}
      </span>
      {/* Animated underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />
      {/* Error messages */}
      <AnimatePresence>
        {isEmpty && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-5 left-0 text-[11px] text-red-400"
          >
            {label}
          </motion.span>
        )}
        {isInvalidEmail && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-5 left-0 text-[11px] text-red-400"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Floating textarea field ── */
function FloatingTextarea({
  label,
  required = true,
  value,
  onChange,
  isInView,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  isInView: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const isActive = focused || value.length > 0;
  const isEmpty = touched && required && value.trim().length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.36 }}
      className="group relative"
    >
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
        rows={4}
        className={`peer w-full resize-none border-b-2 bg-transparent pb-2 pt-6 text-sm text-white outline-none transition-all duration-300 ${
          isEmpty
            ? "border-red-400"
            : focused
              ? "border-white"
              : "border-neutral-700 hover:border-neutral-500"
        }`}
      />
      <span
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          isActive ? "top-0 text-[11px] tracking-wider" : "top-5 text-sm"
        } ${
          isEmpty ? "text-red-400" : focused ? "text-white" : "text-neutral-500"
        }`}
      >
        {label}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />
      <AnimatePresence>
        {isEmpty && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-5 left-0 text-[11px] text-red-400"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Contact form ── */
function ContactForm({ isInView, isRu }: { isInView: boolean; isRu: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
      !formData.message.trim()
    ) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale: isRu ? "ru" : "en" }),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col gap-8"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <FloatingField
          label={isRu ? "\u0418\u043c\u044f" : "Name"}
          value={formData.name}
          onChange={(val) => setFormData({ ...formData, name: val })}
          index={0}
          isInView={isInView}
        />
        <FloatingField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(val) => setFormData({ ...formData, email: val })}
          index={1}
          isInView={isInView}
        />
      </div>
      <FloatingTextarea
        label={
          isRu
            ? "\u0420\u0430\u0441\u0441\u043a\u0430\u0436\u0438\u0442\u0435 \u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0435..."
            : "Tell us about your project..."
        }
        value={formData.message}
        onChange={(val) => setFormData({ ...formData, message: val })}
        isInView={isInView}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.44 }}
        className="pt-2"
      >
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="group inline-flex items-center gap-3 rounded-full border border-white bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {isRu ? "Отправлено ✓" : "Sent ✓"}
              </motion.span>
            ) : error ? (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-600"
              >
                {isRu ? "Ошибка, попробуйте снова" : "Error, try again"}
              </motion.span>
            ) : loading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="inline-flex items-center gap-2"
              >
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                {isRu ? "Отправка..." : "Sending..."}
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="inline-flex items-center gap-3"
              >
                {isRu ? "Отправить" : "Send message"}
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const { t } = useI18n();
  const isRu = t.footer.rights.includes("защищены");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative z-10 overflow-hidden bg-neutral-950 py-20 sm:py-32 lg:py-48"
    >
      {/* Background decorative */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-mono text-[20rem] font-black leading-none text-white/5 lg:text-[30rem]">
          @
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 grid gap-8 md:mb-24 md:grid-cols-2 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <LocaleTransition>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-500">
                <span className="inline-block h-px w-8 bg-neutral-700" />
                {t.contact.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.contact.title}{" "}
                <span className="text-neutral-600">
                  {t.contact.titleAccent}
                </span>
              </h2>
            </LocaleTransition>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:text-right"
          >
            <LocaleTransition>
              <p className="max-w-sm text-sm leading-relaxed text-neutral-500 md:ml-auto">
                {t.contact.text}
              </p>
            </LocaleTransition>
          </motion.div>
        </div>

        {/* Form section */}
        <div className="mx-auto max-w-3xl">
          {/* Email — big magnetic link */}
          <div className="lg:col-span-full">
            {/* Email — big magnetic link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-14"
            >
              <MagneticLink
                href="mailto:hello@not-found.tech"
                className="group relative inline-block"
              >
                <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-neutral-400 sm:text-3xl lg:text-4xl">
                  hello@not-found.tech
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-px w-full origin-left bg-white/20"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </MagneticLink>
            </motion.div>

            {/* Contact form */}
            <ContactForm isInView={isInView} isRu={isRu} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const isRu = t.footer.rights.includes("защищены");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-neutral-800 bg-neutral-950 py-8">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
          {/* Left: logo + copyright */}
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex">
              <Logo variant="dark" size="small" />
            </a>
            <span className="h-3 w-px bg-neutral-700" />
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <span>&copy; {year}</span>
              <span>·</span>
              <LocaleTransition className="inline">
                <span>{t.footer.rights}</span>
              </LocaleTransition>
            </div>
          </div>

          {/* Right: nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-neutral-500 transition-colors duration-200 hover:text-white"
              >
                {isRu ? link.labelRu : link.labelEn}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
