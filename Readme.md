# Telegram Mini App (React + FastAPI)

Универсальный каркас (boilerplate) для создания Telegram Mini App с бэкендом на FastAPI.
Проект реализует безопасную авторизацию через Telegram, адаптивный мобильный UI и базовый пользовательский сценарий (на примере мини-магазина / каталога с оформлением заявок).

## 🚀 Возможности (MVP)

- **Бесшовная авторизация**: Вход через Telegram WebApp (`initData`). Бэкенд строго проверяет криптографическую подпись.
- **Адаптивный UI**: Интеграция с Telegram WebApp SDK (поддержка тем, `MainButton`, `BackButton`, `expand()`).
- **Каталог и Карточки**: Просмотр списка товаров/услуг и детальной информации.
- **Корзина / Заявки**: Формирование заказа, изменение количества, отправка на сервер.
- **История**: Экран «Мои заказы» с фильтрацией по текущему пользователю.
- **Безопасность**: JWT-токены, валидация `initData` на бэкенде, защита CORS.

## 🛠 Технологический стек

**Frontend:**
- React + TypeScript
- Vite (сборка)
- Telegram WebApp SDK
- CSS / Tailwind (или аналогичный utility-first фреймворк для быстрого мобильного UI)

**Backend:**
- Python 3.10+
- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL / SQLite (для локальной разработки)
- Pydantic (валидация)
- python-jose / pyjwt (работа с JWT)

**Инфраструктура:**
- Telegram Bot API
- HTTPS-туннель (ngrok / cloudflared) для локальной отладки

---

## 📡 API Endpoints

| Метод | Endpoint | Описание |
|---|---|---|
| `POST` | `/api/auth/telegram` | Приём `initData`, проверка подписи, выдача JWT и профиля |
| `GET` | `/api/me` | Получение данных текущего авторизованного пользователя |
| `GET` | `/api/items` | Список товаров/услуг (каталог) |
| `GET` | `/api/items/{id}` | Детальная карточка товара/услуги |
| `POST` | `/api/orders` | Создание нового заказа/заявки |
| `GET` | `/api/orders/me` | Список заказов текущего пользователя |

---

## ⚙️ Установка и локальный запуск

### 1. Клонирование и зависимости
```bash
git clone https://github.com/yourusername/telegram-mini-app.git
cd telegram-mini-app

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
```

Создайте файл `.env` в папке `backend`:

`SECRET_KEY` можно сгенерировать командой:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Запуск сервера:

```bash
uvicorn app.main:app --reload
```

Backend будет доступен на `http://localhost:8000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на адресе, который выведет Vite (обычно `http://localhost:5173`).

### 4. Бот

Открыть приложение можно через бота: [@ваш_бот](https://t.me/@myshop_tma_bot)