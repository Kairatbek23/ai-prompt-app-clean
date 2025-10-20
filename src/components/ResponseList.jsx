import React from 'react';

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return '';
  }
}

export default function ResponseList({ items }) {
  if (!items.length) {
    return <div className="empty">No messages yet. Try asking something!</div>;
  }
  return (
    <div className="history" role="log" aria-live="polite">
      {items.map((msg, i) => (
        <div key={i} className="chat-block">
          <div className="bubble user"><strong>You</strong>: {msg.user}</div>
          <div className="bubble ai"><strong>AI</strong>: {msg.ai}</div>
          <div className="ts">{formatTime(msg.ts)}</div>
        </div>
      ))}
    </div>
  );
}