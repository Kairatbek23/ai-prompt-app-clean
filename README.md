# AI Prompt App (Localhost Only)

A lightweight React app to send a prompt to the OpenAI API and display the AI response. Includes chat history (saved in `localStorage`), a clear button, loading & error states, and clean UI. **Designed to run on localhost only; not for deployment.**

## Quick Start

```bash
npm install
npm start
```

Open http://localhost:3000

## Configure your API key

Create a `.env` file in the project root (same folder as `package.json`) and add:

```
REACT_APP_OPENAI_API_KEY=sk-REPLACE_ME
```

> Do **not** commit `.env`. It's already ignored in `.gitignore`.

## Notes
- Model used: `gpt-4o-mini` (fast & affordable). You can change it in `src/lib/openai.js`.
- For extra security, you can run a local proxy server (Express) so your API key never hits the browser. Since this assignment stays on localhost, using the `.env` client-side approach is usually sufficient.