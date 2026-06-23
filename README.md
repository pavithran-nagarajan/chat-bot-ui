# 🤖 Chat Bot UI - Angular Frontend

An Angular-based chat interface for the Llama 3.1 8B AI chatbot. Connects to the FastAPI backend running at `http://127.0.0.1:8000`.

---

## 📋 Prerequisites

- **Node.js** 18+ — [Download](https://nodejs.org)
- **npm** 9+ (comes with Node.js)
- **Angular CLI** 22+
- **Chat Bot backend** running at `http://127.0.0.1:8000` (see backend README)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd chat-bot-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm start
```

The app will be available at **http://localhost:4200**

> The dev server automatically proxies `/api/*` requests to `http://127.0.0.1:8000` — no CORS issues.

---

## 🔗 API Configuration

The UI communicates with the backend via a built-in proxy. No extra configuration needed.

| Setting | Value |
|---|---|
| Frontend URL | http://localhost:4200 |
| Backend URL | http://127.0.0.1:8000 |
| Proxy config | `proxy.conf.json` |

If your backend runs on a different host or port, update `proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://127.0.0.1:8000",
    "changeOrigin": true,
    "pathRewrite": { "^/api": "" }
  }
}
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Build artifacts will be placed in the `dist/chat-bot-ui/` directory.

---

## 📁 Project Structure

```
src/
└── app/
    ├── core/
    │   ├── models/          # TypeScript interfaces (ChatMessage, ChatSession)
    │   └── services/        # ChatService — API calls & session management
    ├── features/
    │   └── chat/
    │       ├── components/
    │       │   ├── chat-history/     # Sidebar with session list
    │       │   ├── chat-input/       # Message box & send button
    │       │   └── message-bubble/   # User / AI message bubbles
    │       └── pages/
    │           └── chat-page/        # Main chat layout
    └── shared/
        └── components/
            └── model-selector/       # AI model dropdown
```

---

## ✨ Features

- 💬 **Chat interface** — send messages and receive AI responses in real time
- 🗂️ **Chat history** — multiple sessions stored in browser `localStorage`
- ⚠️ **Error handling** — displays API error messages inline
- ⌨️ **Keyboard shortcut** — `Enter` to send, `Shift+Enter` for new line
- 🔄 **Typing indicator** — animated dots while waiting for a response
- 🌙 **Dark theme** — clean dark UI out of the box

---

## 🛠️ Useful Commands

| Command | Description |
|---|---|
| `npm start` | Start dev server at http://localhost:4200 |
| `npm run build` | Production build |
| `ng generate component name` | Generate a new component |
| `ng test` | Run unit tests |

---

## 🔗 Related

- **Backend repo:** [Chat Bot - FastAPI + Llama 3.1 8B](../chat-bot/README.md)
- **API docs:** http://127.0.0.1:8000/docs *(requires backend running)*
