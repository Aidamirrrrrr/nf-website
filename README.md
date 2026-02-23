# NotFound Studio — Website

Сайт-портфолио студии веб-разработки **NotFound Studio**.

**Стек:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js

**Демо:** [not-found.tech](https://not-found.tech)

---

## Возможности

- Серверный рендеринг и статическая генерация (App Router)
- Интернационализация EN / RU (cookie + определение через `Accept-Language`)
- Контактная форма с отправкой через SMTP (Nodemailer)
- Плавный скролл (Lenis), параллакс, анимации секций (Framer Motion)
- Интерактивная 3D-сцена в hero (React Three Fiber)
- Кастомный курсор, адаптив, тёмная / светлая секционная навигация
- SEO: метаданные, JSON-LD, sitemap.xml, robots.txt
- Docker-образ (multi-stage, standalone output)

## Структура

```
src/
├── app/
│   ├── api/contact/    — API-роут отправки формы
│   ├── globals.css     — глобальные стили
│   ├── layout.tsx      — корневой лейаут, мета, JSON-LD
│   ├── page.tsx        — главная страница
│   ├── robots.ts       — генерация robots.txt
│   └── sitemap.ts      — генерация sitemap.xml
├── components/
│   ├── sections/       — секции лендинга (hero, about, services, …)
│   ├── three/          — 3D-сцена (React Three Fiber)
│   ├── ui/             — UI-примитивы (button, separator)
│   ├── custom-cursor   — кастомный курсор
│   ├── locale-transition — анимация смены языка
│   ├── logo            — логотип NF Studio
│   └── smooth-scroll   — обёртка Lenis
├── lib/
│   ├── i18n.tsx        — провайдер i18n, словари EN/RU
│   └── utils.ts        — утилита cn (clsx + tailwind-merge)
└── proxy.ts            — Next.js proxy (определение локали)
```

## Быстрый старт

```bash
pnpm install
cp .env.example .env.local   # заполнить SMTP-данные
pnpm dev                     # http://localhost:3000
```

## Переменные окружения

| Переменная  | Описание          | Пример                 |
| ----------- | ----------------- | ---------------------- |
| `SMTP_HOST` | SMTP-сервер       | `smtp.timeweb.ru`      |
| `SMTP_PORT` | Порт (SSL)        | `465`                  |
| `SMTP_USER` | Email отправителя | `hello@not-found.tech` |
| `SMTP_PASS` | Пароль почты      | —                      |

## Скрипты

| Команда       | Описание                  |
| ------------- | ------------------------- |
| `pnpm dev`    | Dev-сервер (Turbopack)    |
| `pnpm build`  | Продакшен-сборка          |
| `pnpm start`  | Запуск standalone-сервера |
| `pnpm lint`   | Проверка (Biome)          |
| `pnpm format` | Форматирование (Biome)    |

## Docker

```bash
docker build -t nf-website .
docker run -p 3000:3000 --env-file .env.local nf-website
```

## Лицензия

Проприетарный. © NotFound Studio, 2024–2026.
