"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LocaleTransition } from "@/components/locale-transition";

/** Секция услуг — интерактивные карточки с SVG-иллюстрациями. */

function IllustrationWebApp({ hovered }: { hovered: boolean }) {
  const fg = hovered ? "#fff" : "#000";
  const muted = hovered ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)";
  const accent = hovered ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)";
  return (
    <svg viewBox="0 0 280 160" fill="none" className="h-full w-full">
      <rect x="20" y="12" width="240" height="136" rx="8" fill={muted} />
      <rect
        x="20"
        y="12"
        width="240"
        height="24"
        rx="8"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
      />
      <rect
        x="20"
        y="30"
        width="240"
        height="6"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
      />
      <circle cx="34" cy="24" r="3" fill={fg} opacity={0.2} />
      <circle cx="44" cy="24" r="3" fill={fg} opacity={0.2} />
      <circle cx="54" cy="24" r="3" fill={fg} opacity={0.2} />
      <rect
        x="26"
        y="40"
        width="50"
        height="102"
        fill={hovered ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}
      />
      <rect
        x="32"
        y="50"
        width="30"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.7"
      />
      <rect
        x="32"
        y="60"
        width="38"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.1"
      />
      <rect
        x="32"
        y="68"
        width="38"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.1"
      />
      <rect
        x="32"
        y="76"
        width="28"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.1"
      />
      <rect
        x="32"
        y="84"
        width="38"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.1"
      />
      <rect
        x="84"
        y="46"
        width="80"
        height="8"
        rx="3"
        fill={fg}
        opacity="0.15"
      />
      <rect
        x="84"
        y="62"
        width="60"
        height="36"
        rx="4"
        fill={accent}
        opacity="0.15"
      />
      <rect
        x="150"
        y="62"
        width="60"
        height="36"
        rx="4"
        fill={accent}
        opacity="0.08"
      />
      <rect
        x="216"
        y="62"
        width="36"
        height="36"
        rx="4"
        fill={accent}
        opacity="0.08"
      />
      <rect
        x="84"
        y="106"
        width="166"
        height="30"
        rx="4"
        fill={hovered ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"}
      />
      <polyline
        points="92,130 110,122 128,126 146,118 164,112 182,115 200,108 218,110 236,104 244,100"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IllustrationLanding({ hovered }: { hovered: boolean }) {
  const fg = hovered ? "#fff" : "#000";
  const muted = hovered ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)";
  const accent = hovered ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)";
  return (
    <svg viewBox="0 0 280 160" fill="none" className="h-full w-full">
      <rect x="50" y="8" width="180" height="144" rx="8" fill={muted} />
      <rect
        x="60"
        y="18"
        width="40"
        height="5"
        rx="2"
        fill={fg}
        opacity="0.2"
      />
      <rect
        x="140"
        y="18"
        width="16"
        height="5"
        rx="2"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="160"
        y="18"
        width="16"
        height="5"
        rx="2"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="180"
        y="18"
        width="16"
        height="5"
        rx="2"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="200"
        y="17"
        width="22"
        height="7"
        rx="3"
        fill={accent}
        opacity="0.7"
      />
      <rect
        x="70"
        y="38"
        width="100"
        height="8"
        rx="3"
        fill={fg}
        opacity="0.2"
      />
      <rect
        x="80"
        y="50"
        width="80"
        height="5"
        rx="2"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="100"
        y="62"
        width="42"
        height="10"
        rx="5"
        fill={accent}
        opacity="0.6"
      />
      <rect
        x="62"
        y="84"
        width="46"
        height="30"
        rx="4"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
      />
      <circle cx="85" cy="94" r="4" fill={accent} opacity="0.4" />
      <rect
        x="72"
        y="103"
        width="26"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="117"
        y="84"
        width="46"
        height="30"
        rx="4"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
      />
      <circle cx="140" cy="94" r="4" fill={accent} opacity="0.4" />
      <rect
        x="127"
        y="103"
        width="26"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="172"
        y="84"
        width="46"
        height="30"
        rx="4"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
      />
      <circle cx="195" cy="94" r="4" fill={accent} opacity="0.4" />
      <rect
        x="182"
        y="103"
        width="26"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="62"
        y="124"
        width="156"
        height="20"
        rx="0"
        fill={hovered ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"}
      />
      <rect
        x="70"
        y="132"
        width="40"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.06"
      />
      <rect
        x="14"
        y="50"
        width="36"
        height="16"
        rx="8"
        fill={accent}
        opacity="0.2"
      />
      <text
        x="22"
        y="61"
        fontSize="7"
        fontFamily="system-ui"
        fontWeight="600"
        fill={accent}
      >
        SEO
      </text>
      <rect
        x="230"
        y="30"
        width="36"
        height="16"
        rx="8"
        fill={accent}
        opacity="0.2"
      />
      <text
        x="234"
        y="41"
        fontSize="6"
        fontFamily="system-ui"
        fontWeight="600"
        fill={accent}
      >
        &lt;1s
      </text>
    </svg>
  );
}

function IllustrationTMA({ hovered }: { hovered: boolean }) {
  const fg = hovered ? "#fff" : "#000";
  const muted = hovered ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)";
  const accent = hovered ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)";
  return (
    <svg viewBox="0 0 280 160" fill="none" className="h-full w-full">
      <rect x="100" y="6" width="80" height="148" rx="12" fill={muted} />
      <rect
        x="104"
        y="12"
        width="72"
        height="136"
        rx="9"
        fill={hovered ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"}
      />
      <rect
        x="125"
        y="14"
        width="30"
        height="4"
        rx="2"
        fill={fg}
        opacity="0.08"
      />
      <rect
        x="110"
        y="26"
        width="60"
        height="12"
        rx="4"
        fill={accent}
        opacity="0.2"
      />
      <text
        x="122"
        y="35"
        fontSize="7"
        fontFamily="system-ui"
        fontWeight="700"
        fill={accent}
      >
        TMA
      </text>
      <rect
        x="110"
        y="46"
        width="60"
        height="16"
        rx="4"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
      />
      <circle cx="118" cy="54" r="4" fill={accent} opacity="0.3" />
      <rect
        x="126"
        y="51"
        width="36"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.12"
      />
      <rect
        x="126"
        y="56"
        width="24"
        height="2"
        rx="1"
        fill={fg}
        opacity="0.06"
      />
      <rect
        x="110"
        y="66"
        width="60"
        height="16"
        rx="4"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
      />
      <circle cx="118" cy="74" r="4" fill={accent} opacity="0.3" />
      <rect
        x="126"
        y="71"
        width="36"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.12"
      />
      <rect
        x="126"
        y="76"
        width="24"
        height="2"
        rx="1"
        fill={fg}
        opacity="0.06"
      />
      <rect
        x="110"
        y="86"
        width="60"
        height="16"
        rx="4"
        fill={hovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
      />
      <circle cx="118" cy="94" r="4" fill={accent} opacity="0.3" />
      <rect
        x="126"
        y="91"
        width="36"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.12"
      />
      <rect
        x="126"
        y="96"
        width="24"
        height="2"
        rx="1"
        fill={fg}
        opacity="0.06"
      />
      <rect
        x="112"
        y="110"
        width="56"
        height="12"
        rx="6"
        fill={accent}
        opacity="0.6"
      />
      <rect
        x="124"
        y="114"
        width="32"
        height="4"
        rx="2"
        fill={hovered ? "#000" : "#fff"}
        opacity="0.9"
      />
      <rect
        x="120"
        y="132"
        width="40"
        height="4"
        rx="2"
        fill={fg}
        opacity="0.08"
      />
      <circle cx="48" cy="60" r="20" fill={muted} />
      <circle cx="48" cy="56" r="6" fill={accent} opacity="0.3" />
      <rect
        x="38"
        y="66"
        width="20"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.1"
      />
      <path
        d="M40 50 L34 44 M56 50 L62 44"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <rect
        x="202"
        y="40"
        width="56"
        height="18"
        rx="8"
        fill={accent}
        opacity="0.12"
      />
      <rect
        x="210"
        y="46"
        width="32"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.1"
      />
      <rect
        x="210"
        y="51"
        width="20"
        height="2"
        rx="1"
        fill={fg}
        opacity="0.06"
      />
      <rect x="208" y="68" width="56" height="18" rx="8" fill={muted} />
      <rect
        x="216"
        y="74"
        width="32"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.1"
      />
      <rect
        x="216"
        y="79"
        width="22"
        height="2"
        rx="1"
        fill={fg}
        opacity="0.06"
      />
      <path
        d="M224 110 L248 98 L228 120 L230 110 Z"
        fill={accent}
        opacity="0.15"
      />
    </svg>
  );
}

function IllustrationAPI({ hovered }: { hovered: boolean }) {
  const fg = hovered ? "#fff" : "#000";
  const muted = hovered ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)";
  const accent = hovered ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)";
  return (
    <svg viewBox="0 0 280 160" fill="none" className="h-full w-full">
      <circle cx="140" cy="80" r="22" fill={muted} />
      <circle cx="140" cy="80" r="14" fill={accent} opacity="0.15" />
      <text
        x="128"
        y="84"
        fontSize="10"
        fontFamily="system-ui"
        fontWeight="700"
        fill={accent}
      >
        API
      </text>
      <line
        x1="124"
        y1="62"
        x2="72"
        y2="32"
        stroke={fg}
        strokeWidth="0.8"
        opacity="0.1"
      />
      <rect x="40" y="18" width="56" height="28" rx="8" fill={muted} />
      <rect
        x="48"
        y="25"
        width="32"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.4"
      />
      <rect
        x="48"
        y="33"
        width="40"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.08"
      />
      <line
        x1="156"
        y1="62"
        x2="210"
        y2="32"
        stroke={fg}
        strokeWidth="0.8"
        opacity="0.1"
      />
      <rect x="186" y="18" width="52" height="28" rx="8" fill={muted} />
      <rect
        x="194"
        y="25"
        width="28"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.4"
      />
      <rect
        x="194"
        y="33"
        width="36"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.08"
      />
      <line
        x1="124"
        y1="98"
        x2="68"
        y2="128"
        stroke={fg}
        strokeWidth="0.8"
        opacity="0.1"
      />
      <rect x="32" y="114" width="62" height="28" rx="8" fill={muted} />
      <rect
        x="40"
        y="121"
        width="36"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.4"
      />
      <rect
        x="40"
        y="129"
        width="46"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.08"
      />
      <line
        x1="156"
        y1="98"
        x2="214"
        y2="128"
        stroke={fg}
        strokeWidth="0.8"
        opacity="0.1"
      />
      <rect x="190" y="114" width="52" height="28" rx="8" fill={muted} />
      <rect
        x="198"
        y="121"
        width="22"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.4"
      />
      <rect
        x="198"
        y="129"
        width="36"
        height="3"
        rx="1.5"
        fill={fg}
        opacity="0.08"
      />
      <line
        x1="118"
        y1="80"
        x2="42"
        y2="80"
        stroke={fg}
        strokeWidth="0.8"
        opacity="0.1"
      />
      <circle cx="28" cy="80" r="14" fill={muted} />
      <rect
        x="20"
        y="77"
        width="16"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.3"
      />
      <line
        x1="162"
        y1="80"
        x2="238"
        y2="80"
        stroke={fg}
        strokeWidth="0.8"
        opacity="0.1"
      />
      <circle cx="252" cy="80" r="14" fill={muted} />
      <rect
        x="244"
        y="74"
        width="16"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.3"
      />
      <rect
        x="244"
        y="82"
        width="16"
        height="4"
        rx="2"
        fill={accent}
        opacity="0.15"
      />
      <circle
        cx="140"
        cy="80"
        r="30"
        stroke={accent}
        strokeWidth="0.5"
        opacity="0.1"
      />
      <circle
        cx="140"
        cy="80"
        r="42"
        stroke={accent}
        strokeWidth="0.3"
        opacity="0.06"
      />
    </svg>
  );
}

const illustrations = [
  IllustrationWebApp,
  IllustrationLanding,
  IllustrationTMA,
  IllustrationAPI,
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const services = [
    {
      title: t.services.branding,
      description: t.services.brandingDesc,
      num: "01",
    },
    {
      title: t.services.webdev,
      description: t.services.webdevDesc,
      num: "02",
    },
    {
      title: t.services.uiux,
      description: t.services.uiuxDesc,
      num: "03",
    },
    {
      title: t.services.motion,
      description: t.services.motionDesc,
      num: "04",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-neutral-50 py-20 sm:py-32 lg:py-48"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mb-20 grid gap-8 md:mb-24 md:grid-cols-2 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <LocaleTransition>
              <span className="mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-neutral-400">
                <span className="inline-block h-px w-8 bg-neutral-300" />
                {t.services.label}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
                {t.services.title}{" "}
                <span className="text-neutral-300">
                  {t.services.titleAccent}
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
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              <LocaleTransition className="inline">
                {t.services.branding.includes("Веб")
                  ? "Обсудить проект"
                  : "Discuss a project"}
              </LocaleTransition>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i;
            const Illustration = illustrations[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10"
              >
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="relative z-10 flex h-full flex-col lg:min-h-80">
                  <div className="mb-4 flex items-start justify-between">
                    <motion.span
                      animate={{ color: isHovered ? "#737373" : "#d4d4d4" }}
                      transition={{ duration: 0.5 }}
                      className="font-mono text-sm"
                    >
                      {service.num}
                    </motion.span>
                  </div>

                  <motion.div
                    className="mb-6 h-36 w-full lg:h-40"
                    animate={{
                      scale: isHovered ? 1.03 : 1,
                      y: isHovered ? -4 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Illustration hovered={isHovered} />
                  </motion.div>

                  <div className="mt-auto">
                    <LocaleTransition>
                      <h3
                        className={`mb-3 text-xl font-bold transition-colors duration-500 lg:text-2xl ${
                          isHovered ? "text-white" : "text-black"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-500 ${
                          isHovered ? "text-neutral-400" : "text-neutral-500"
                        }`}
                      >
                        {service.description}
                      </p>
                    </LocaleTransition>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
