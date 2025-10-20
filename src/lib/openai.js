import axios from 'axios';

/**
 * Sends a prompt to the OpenAI Chat Completions API and returns the text.
 * Requires REACT_APP_OPENAI_API_KEY in .env
 */
export async function sendPrompt(prompt) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing API key. Set REACT_APP_OPENAI_API_KEY in .env');
  }

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a concise, helpful assistant.' },
      { role: 'user', content: prompt }
    ]
  };

  const res = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    timeout: 30000
  });

  const choice = res?.data?.choices?.[0];
  const content = choice?.message?.content?.trim();
  if (!content) {
    throw new Error('Empty response from AI');
  }
  return content;
}