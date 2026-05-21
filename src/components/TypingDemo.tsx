'use client';

import { useEffect, useState } from 'react';

const snippets = [
  'Build a SaaS dashboard with auth and Stripe billing',
  'Create an e-commerce store with product catalog and cart',
  'Generate a REST API with JWT auth and rate limiting',
  'Make a real-time chat app with rooms and notifications',
];

export function TypingDemo() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = snippets[snippetIdx];

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(charIdx + 1), 40 + Math.random() * 30);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(charIdx - 1), 20);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setSnippetIdx((snippetIdx + 1) % snippets.length);
    }
  }, [charIdx, deleting, snippetIdx]);

  const current = snippets[snippetIdx];
  const displayed = current.slice(0, charIdx);

  return (
    <span className="text-text">
      {displayed}
      <span className="animate-pulse-subtle text-accent">|</span>
    </span>
  );
}
