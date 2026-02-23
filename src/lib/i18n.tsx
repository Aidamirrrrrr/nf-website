"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "ru" | "en";

const dictionaries = {
  ru: {
    nav: {
      about: "О нас",
      services: "Услуги",
      work: "Работы",
      contact: "Контакт",
      cta: "Написать",
    },
    hero: {
      line1: "Создаём",
      line2: "digital-продукты",
      subtitle1: "Студия разработки, сфокусированная на результате.",
      subtitle2: "Код, дизайн, запуск.",
      cta: "Смотреть работы",
      scroll: "Скролл",
    },
    about: {
      label: "О нас",
      title: "Превращаем идеи в",
      titleAccent: "продукты",
      text1:
        "Resolve Studio — студия fullstack-разработки под руководством Айдамира Камбиева. Команда из 4 разработчиков, которая ведёт проекты от идеи до деплоя. Мы создаём веб-приложения, Telegram Mini Apps, интернет-магазины и финтех-платформы, которые решают реальные бизнес-задачи.",
      text2:
        "Наш стек — TypeScript, React, Next.js, NestJS, PostgreSQL. Мы не просто пишем код — мы строим надёжную архитектуру, настраиваем CI/CD и сопровождаем продукт после запуска. 15+ проектов в продакшене за 2.5 года.",
      stat1: "Года опыта",
      stat2: "Проектов в продакшене",
      stat3: "Довольных клиентов",
    },
    services: {
      label: "Что мы делаем",
      title: "Услуги, созданные с",
      titleAccent: "точностью",
      branding: "Веб-приложения",
      brandingDesc:
        "Fullstack-приложения на React, Next.js и NestJS. SSR, WebSocket, авторизация, админки — от MVP до масштабируемого SaaS.",
      webdev: "Сайты и лендинги",
      webdevDesc:
        "Конверсионные сайты на современном стеке. SEO, Schema.org, адаптивность, скорость загрузки < 1 секунды.",
      uiux: "Telegram Mini Apps",
      uiuxDesc:
        "Разрабатываем Telegram-приложения: боты с оплатой, Mini Apps с полным UI, интеграции с внешними API.",
      motion: "Интеграции и API",
      motionDesc:
        "ЮKassa, iiko, OpenAI, Remnawave, S3 — подключаем любые сервисы. Надёжная архитектура бэкенда на NestJS.",
    },
    projects: {
      label: "Избранные работы",
      title: "Наши",
      titleAccent: "проекты",
      cta: "Начать проект",
      p1cat: "VPN-сервис",
      p1desc:
        "Telegram-бот для продажи VPN-подписок с оплатой через ЮKassa и Telegram Stars, лендинг и личный кабинет.",
      p2cat: "Telegram Mini App",
      p2desc:
        "TMA-платформа для организации мероприятий: создание событий, регистрация участников, профили и статистика. Next.js, Drizzle, PostgreSQL.",
      p3cat: "Telegram Mini App",
      p3desc:
        "Платформа публикации контента в Telegram-каналы с TMA, админкой и бот-синхронизацией участников.",
      p4cat: "AI-платформа",
      p4desc:
        "Frontend AI-платформы: архитектура по FSD, SSR с инвалидацией кэша, админка, чат на WebSocket и авторизация на токенах.",
    },
    process: {
      label: "Как мы работаем",
      title: "Прозрачный",
      titleAccent: "процесс",
      step1: "Бриф и аналитика",
      step1desc:
        "Погружаемся в бизнес-задачу. Анализируем рынок, конкурентов, целевую аудиторию. Формируем чёткое ТЗ и роадмап проекта.",
      step2: "Дизайн и прототип",
      step2desc:
        "Создаём wireframes и интерактивные прототипы. Тестируем UX на реальных сценариях. Утверждаем визуальный стиль.",
      step3: "Разработка",
      step3desc:
        "Пишем чистый, типизированный код. Еженедельные демо и ревью. CI/CD с первого дня — никаких сюрпризов при деплое.",
      step4: "Запуск и поддержка",
      step4desc:
        "Деплоим проект, настраиваем мониторинг и аналитику. Остаёмся на связи для итераций и масштабирования.",
    },
    stack: {
      label: "Наш стек",
      title: "Технологии, которым",
      titleAccent: "доверяем",
      frontend: "Фронтенд",
      backend: "Бэкенд",
      tools: "Инструменты",
      infra: "Инфраструктура",
    },
    testimonials: {
      label: "Отзывы",
      title: "Клиенты",
      titleAccent: "говорят",
      t1name: "Команда FlowAi",
      t1role: "CTO, FlowAi",
      t1text:
        "Айдамир построил архитектуру фронтенда по FSD, сделал SSR с инвалидацией кэша, авторизацию на access/refresh токенах, масштабную админку и чат на WebSocket. Код чистый, сроки соблюдены.",
      t2name: "Команда Void",
      t2role: "Project Lead, Void",
      t2text:
        "Автоматизировали блог через OpenAI API — публикация сократилась с 2 часов до 5 минут. Плюс интерактивный лендинг на Pixi.js. Впечатляет.",
    },
    faq: {
      label: "FAQ",
      title: "Частые",
      titleAccent: "вопросы",
      q1: "Сколько стоит разработка?",
      a1: "Лендинг — от 80 000 ₽, веб-приложение — от 250 000 ₽, Telegram Mini App — от 150 000 ₽. Начинаем с бесплатной оценки и фиксируем бюджет.",
      q2: "Какие сроки разработки?",
      a2: "Лендинг — 2–3 недели. Веб-приложение — 1.5–3 месяца. Telegram Mini App — 3–6 недель. Точные сроки после брифа.",
      q3: "Какой стек вы используете?",
      a3: "TypeScript, React, Next.js, NestJS, PostgreSQL, Prisma, Drizzle. Для ботов — Grammy. Деплой через Docker и Railway. Выбираем стек под задачу.",
      q4: "Работаете ли вы с зарубежными клиентами?",
      a4: "Да, работаем с клиентами из любых стран. Коммуникация на русском и английском. Есть опыт работы с командами из Черногории, Беларуси, Азербайджана.",
      q5: "Что входит в поддержку после запуска?",
      a5: "Мониторинг, исправление багов, обновление зависимостей, доработки. CI/CD настроен с первого дня — деплой без простоев.",
    },
    ctaBanner: {
      title: "Давайте построим",
      titleAccent: "ваш продукт",
      text: "Бесплатная консультация и оценка проекта за 24 часа. Без обязательств.",
      cta: "Получить оценку бесплатно",
      stat1val: "70%",
      stat1label: "ускорение запросов",
      stat2val: "24ч",
      stat2label: "время ответа",
      stat3val: "15+",
      stat3label: "проектов",
    },
    contact: {
      label: "Свяжитесь с нами",
      title: "Давайте",
      titleAccent: "создадим",
      text: "Есть идея продукта? Расскажите о задаче — мы предложим решение и оценим сроки. От концепции до запуска.",
    },
    footer: {
      rights: "Все права защищены.",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      work: "Work",
      contact: "Contact",
      cta: "Let's talk",
    },
    hero: {
      line1: "We build",
      line2: "digital products",
      subtitle1: "Development studio focused on results.",
      subtitle2: "Code, design, launch.",
      cta: "View our work",
      scroll: "Scroll",
    },
    about: {
      label: "About us",
      title: "We turn ideas into",
      titleAccent: "products",
      text1:
        "Resolve Studio is a fullstack development studio led by Aidamir Kambiev. A team of 4 developers that takes projects from idea to deployment. We build web apps, Telegram Mini Apps, e-commerce platforms, and fintech solutions that solve real business challenges.",
      text2:
        "Our stack is TypeScript, React, Next.js, NestJS, PostgreSQL. We don't just write code — we build reliable architecture, set up CI/CD, and support the product after launch. 15+ projects in production in 2.5 years.",
      stat1: "Years of experience",
      stat2: "Projects in production",
      stat3: "Happy clients",
    },
    services: {
      label: "What we do",
      title: "Services crafted with",
      titleAccent: "precision",
      branding: "Web Applications",
      brandingDesc:
        "Fullstack apps on React, Next.js, and NestJS. SSR, WebSocket, auth, admin panels — from MVP to scalable SaaS.",
      webdev: "Websites & Landing Pages",
      webdevDesc:
        "High-converting sites on a modern stack. SEO, Schema.org, responsive, load time under 1 second.",
      uiux: "Telegram Mini Apps",
      uiuxDesc:
        "We build Telegram apps: bots with payments, Mini Apps with full UI, third-party API integrations.",
      motion: "Integrations & API",
      motionDesc:
        "YooKassa, iiko, OpenAI, Remnawave, S3 — we integrate any service. Reliable backend architecture on NestJS.",
    },
    projects: {
      label: "Selected work",
      title: "Recent",
      titleAccent: "projects",
      cta: "Start a project",
      p1cat: "VPN Service",
      p1desc:
        "Telegram bot for VPN subscriptions with YooKassa and Telegram Stars payments, landing page, and user cabinet.",
      p2cat: "Telegram Mini App",
      p2desc:
        "TMA platform for organizing events: event creation, participant registration, profiles, and analytics. Next.js, Drizzle, PostgreSQL.",
      p3cat: "Telegram Mini App",
      p3desc:
        "Content publishing platform for Telegram channels with TMA, admin panel, and member sync bot.",
      p4cat: "AI Platform",
      p4desc:
        "Frontend for an AI platform: FSD architecture, SSR with cache invalidation, admin panel, WebSocket chat, and token-based auth.",
    },
    process: {
      label: "How we work",
      title: "Transparent",
      titleAccent: "process",
      step1: "Brief & Research",
      step1desc:
        "We dive deep into the business challenge. Analyze the market, competitors, target audience. Create a clear spec and project roadmap.",
      step2: "Design & Prototype",
      step2desc:
        "We craft wireframes and interactive prototypes. Test UX on real scenarios. Finalize the visual direction.",
      step3: "Development",
      step3desc:
        "Clean, typed code. Weekly demos and reviews. CI/CD from day one — no surprises at deployment.",
      step4: "Launch & Support",
      step4desc:
        "We deploy, set up monitoring and analytics. Stay available for iterations and scaling.",
    },
    stack: {
      label: "Our stack",
      title: "Technologies we",
      titleAccent: "trust",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
      infra: "Infrastructure",
    },
    testimonials: {
      label: "Testimonials",
      title: "Clients",
      titleAccent: "speak",
      t1name: "FlowAi Team",
      t1role: "CTO, FlowAi",
      t1text:
        "Aidamir built the frontend architecture with FSD, implemented SSR with cache invalidation, auth on access/refresh tokens, a large-scale admin panel, and a WebSocket chat. Clean code, deadlines met.",
      t2name: "Void Team",
      t2role: "Project Lead, Void",
      t2text:
        "Automated the blog via OpenAI API — publishing went from 2 hours to 5 minutes. Plus an interactive landing page on Pixi.js. Impressive.",
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked",
      titleAccent: "questions",
      q1: "How much does development cost?",
      a1: "Landing page — from $1,000, web app — from $3,000, Telegram Mini App — from $2,000. We start with a free estimate and fix the budget.",
      q2: "What are the typical timelines?",
      a2: "Landing page — 2–3 weeks. Web app — 1.5–3 months. Telegram Mini App — 3–6 weeks. Exact timelines after the brief.",
      q3: "What tech stack do you use?",
      a3: "TypeScript, React, Next.js, NestJS, PostgreSQL, Prisma, Drizzle. For bots — Grammy. Deploy via Docker and Railway. We choose the stack for the task.",
      q4: "Do you work with international clients?",
      a4: "Yes, we work with clients worldwide. Communication in Russian and English. Experience working with teams from Montenegro, Belarus, Azerbaijan.",
      q5: "What's included in post-launch support?",
      a5: "Monitoring, bug fixes, dependency updates, improvements. CI/CD is set up from day one — deployments without downtime.",
    },
    ctaBanner: {
      title: "Let's build",
      titleAccent: "your product",
      text: "Free consultation and project estimate within 24 hours. No strings attached.",
      cta: "Get a free estimate",
      stat1val: "70%",
      stat1label: "faster queries",
      stat2val: "24h",
      stat2label: "response time",
      stat3val: "15+",
      stat3label: "projects",
    },
    contact: {
      label: "Get in touch",
      title: "Let's",
      titleAccent: "build",
      text: "Have a product idea? Tell us about the challenge — we'll propose a solution and estimate timelines. From concept to launch.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

type Dictionary = DeepStringify<(typeof dictionaries)["ru"]>;

interface I18nContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale");
      if (saved === "ru" || saved === "en") return saved;
    }
    return "ru";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const t = dictionaries[locale];

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
