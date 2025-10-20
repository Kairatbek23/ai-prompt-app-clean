import React, { useEffect, useState } from 'react';
import PromptInput from './components/PromptInput';
import ResponseList from './components/ResponseList';
import { sendPrompt } from './lib/openai';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('chatHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }, [history]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    try {
      const aiText = await sendPrompt(prompt);
      setHistory((prev) => [...prev, { user: prompt, ai: aiText, ts: Date.now() }]);
      setPrompt('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch AI response. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    setHistory([]);
    setError('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>AI Prompt Assistant</h1>
        <p className="subtitle">Local-only demo • Clean UI • Solid architecture</p>
      </header>

      <main className="main">
        <form onSubmit={onSubmit} className="prompt-form">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            disabled={loading}
          />
          <button type="submit" disabled={loading} className="btn primary">
            {loading ? 'Loading…' : 'Submit'}
          </button>
          <button type="button" onClick={onClear} className="btn danger" disabled={loading || history.length===0}>
            Clear
          </button>
        </form>

        {error && <div className="error" role="alert">{error}</div>}

        <ResponseList items={history} />
      </main>

      <footer className="footer">
        <small>Tip: add your key to <code>.env</code> (see <code>.env.example</code>)</small>
      </footer>
    </div>
  );
}