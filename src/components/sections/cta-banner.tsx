"use client";

/** CTA-баннер с призывом к действию. */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

export function CtaBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const { t } = useI18n();

  const stats = [
    { value: t.ctaBanner.stat1val, label: t.ctaBanner.stat1label },
    { value: t.ctaBanner.stat2val, label: t.ctaBanner.stat2label },
    { value: t.ctaBanner.stat3val, label: t.ctaBanner.stat3label },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-20 sm:py-32 lg:py-48"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-mono text-[20rem] font-black leading-none text-black/3 lg:text-[30rem]">
          →
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28"
        >
          <LocaleTransition>
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
              <span className="inline-block h-px w-8 bg-neutral-300" />
              CTA
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
              {t.ctaBanner.title}{" "}
              <span className="text-neutral-400">
                {t.ctaBanner.titleAccent}
              </span>
            </h2>
          </LocaleTransition>
        </motion.div>

        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <LocaleTransition>
                <p className="mb-10 max-w-md text-base leading-relaxed text-neutral-500 lg:text-lg">
                  {t.ctaBanner.text}
                </p>
              </LocaleTransition>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:gap-5 hover:bg-neutral-800"
              >
                <LocaleTransition className="inline">
                  {t.ctaBanner.cta}
                </LocaleTransition>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <div className="flex flex-col gap-0">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-baseline justify-between border-b border-neutral-200 py-8 first:pt-0 last:border-b-0"
              >
                <LocaleTransition>
                  <span className="text-xs uppercase tracking-widest text-neutral-500">
                    {stat.label}
                  </span>
                </LocaleTransition>
                <LocaleTransition>
                  <span className="text-4xl font-bold text-black sm:text-5xl">
                    {stat.value}
                  </span>
                </LocaleTransition>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
