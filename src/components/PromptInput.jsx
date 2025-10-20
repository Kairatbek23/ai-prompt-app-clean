import React from 'react';

export default function PromptInput({ value, onChange, disabled }) {
  return (
    <input
      type="text"
      className="input"
      placeholder="Enter your prompt…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      aria-label="Prompt input"
    />
  );
}