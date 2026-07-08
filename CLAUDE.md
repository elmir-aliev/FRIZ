# Friz — сайт мебельной студии

## Что это
Одностраничный/многостраничный сайт мебельной студии Friz. Витрина: коллекции, мебель, интерьеры, проекты.

## Стек
- **React 19** + **Vite 8**, JS (не TS), `type: module`.
- Роутинг — **свой hash-router**: `src/router/hashRouter.js` (не react-router).
- Стили — обычный CSS: `src/App.css`, `src/index.css` + CSS рядом с компонентами.
- Изображения оптимизируются в **webp** через `sharp` — скрипт `scripts/convert-images.mjs`. Оригиналы в `originals-webp/`.

## Структура
- `src/pages/` — Home, Collection, Furniture, Interior, Project.
- `src/components/` — Button, Card, ContactFormSection, ImageBlock, Navbar, Panel, Reveal, SiteFooter, VideoHero.
- `public/` — статика, попадает в сборку как есть (favicon, robots.txt, sitemap.xml, og-image, fonts).
- `dist/` — собранный сайт (то, что деплоится).

## Команды
- `npm run dev` — локальная разработка.
- `npm run build` — прод-сборка в `dist/`.
- `npm run preview` — предпросмотр сборки.
- `npm run lint` — ESLint.

## Соглашения
- Русский язык в общении и комментариях.
- Один компонент — своя папка в `src/components/<Name>/`.
- Перед коммитом ничего не коммитить/пушить без явной просьбы пользователя.

## Правила и договорённости
<!-- Сюда дописываем устойчивые правила по мере работы. -->
