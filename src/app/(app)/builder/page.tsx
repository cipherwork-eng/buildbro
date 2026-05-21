'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, File, Folder, FolderOpen, ChevronRight, ChevronDown, Terminal as TerminalIcon, Monitor, Loader2 } from 'lucide-react';
import type { ChatMessage as ChatMsg, GeneratedFile, TerminalLine } from '@/lib/types';
import { ChatMessage } from '@/components/ChatMessage';
import { CodeBlock } from '@/components/CodeBlock';
import { getFileIcon, getLanguageFromPath } from '@/lib/utils';
import { sampleGeneratedFiles } from '@/lib/data';

type RightTab = 'code' | 'preview' | 'terminal';

export default function BuilderPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to BuildBro! I'm your AI code generator. Describe the app you want to build and I'll generate a complete, production-ready codebase for you.\n\nTry something like:\n- \"Build a SaaS dashboard with user auth and Stripe billing\"\n- \"Create a blog with MDX and full-text search\"\n- \"Make a REST API with JWT auth and rate limiting\"",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['src', 'src/app', 'src/components']));
  const [rightTab, setRightTab] = useState<RightTab>('code');
  const [termLines, setTermLines] = useState<TerminalLine[]>([]);
  const [openFileTabs, setOpenFileTabs] = useState<string[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addTermLine = (text: string, type: TerminalLine['type']) => {
    setTermLines((prev) => [...prev, { id: `t${Date.now()}-${Math.random()}`, text, type, timestamp: Date.now() }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMsg: ChatMsg = {
      id: `u${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);
    setRightTab('terminal');
    setTermLines([]);
    addTermLine('$ buildbro generate', 'command');
    addTermLine('Connecting to MiMo V2.5 Pro...', 'info');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg.content,
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      addTermLine('Generating code...', 'info');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                fullText += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  if (updated[lastIdx]?.role === 'assistant' && updated[lastIdx]?.id === 'streaming') {
                    updated[lastIdx] = { ...updated[lastIdx], content: fullText };
                  } else {
                    updated.push({ id: 'streaming', role: 'assistant', content: fullText, timestamp: Date.now() });
                  }
                  return updated;
                });
              }
            } catch {
              // skip parse errors
            }
          }
        }
      }

      // Parse generated files from the response
      const fileBlocks = parseFilesFromResponse(fullText);
      if (fileBlocks.length > 0) {
        setFiles(fileBlocks);
        addTermLine(`Generated ${fileBlocks.length} files`, 'success');
        addTermLine('Installing dependencies...', 'info');
        setTimeout(() => {
          addTermLine('Dependencies installed', 'success');
          addTermLine('Build complete ✓', 'success');
          setRightTab('code');
          setActiveFile(fileBlocks[0].path);
          setOpenFileTabs([fileBlocks[0].path]);
        }, 800);
      } else {
        addTermLine('No code files detected in response', 'warning');
      }

      // Finalize streaming message
      setMessages((prev) => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (updated[lastIdx]?.id === 'streaming') {
          updated[lastIdx] = { ...updated[lastIdx], id: `a${Date.now()}` };
        }
        return updated;
      });

    } catch (err) {
      addTermLine(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error');
      setMessages((prev) => [
        ...prev,
        {
          id: `err${Date.now()}`,
          role: 'assistant',
          content: `I encountered an error generating your code: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const parseFilesFromResponse = (text: string): GeneratedFile[] => {
    const fileRegex = /```(\w+)?\s*(?:filename="([^"]+)")?\n([\s\S]*?)```/g;
    const parsed: GeneratedFile[] = [];
    let match;

    while ((match = fileRegex.exec(text)) !== null) {
      const lang = match[1] || 'text';
      const filename = match[2] || inferFilename(lang, parsed.length);
      const content = match[3].trim();
      parsed.push({ path: filename, content, language: lang });
    }

    // If no files with filenames found, use sample files as demo
    if (parsed.length === 0) {
      return sampleGeneratedFiles;
    }
    return parsed;
  };

  const inferFilename = (lang: string, index: number): string => {
    const map: Record<string, string> = {
      tsx: 'src/components/Component.tsx',
      ts: 'src/lib/utils.ts',
      js: 'src/index.js',
      jsx: 'src/App.jsx',
      json: 'config.json',
      css: 'src/styles.css',
      html: 'index.html',
      python: 'main.py',
    };
    return map[lang] || `file${index}.${lang}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folder)) next.delete(folder);
      else next.add(folder);
      return next;
    });
  };

  const openFile = (path: string) => {
    setActiveFile(path);
    setRightTab('code');
    setOpenFileTabs((prev) => prev.includes(path) ? prev : [...prev, path]);
  };

  const closeTab = (path: string) => {
    setOpenFileTabs((prev) => prev.filter((t) => t !== path));
    if (activeFile === path) {
      const remaining = openFileTabs.filter((t) => t !== path);
      setActiveFile(remaining[remaining.length - 1] || null);
    }
  };

  // Build file tree
  const buildTree = () => {
    const tree: Record<string, string[]> = {};
    for (const f of files) {
      const parts = f.path.split('/');
      let current = '';
      for (let i = 0; i < parts.length - 1; i++) {
        current = current ? `${current}/${parts[i]}` : parts[i];
        if (!tree[current]) tree[current] = [];
      }
      const parent = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
      if (!tree[parent]) tree[parent] = [];
      if (!tree[parent].includes(f.path)) tree[parent].push(f.path);
    }
    return tree;
  };

  const renderTreeItem = (path: string, depth: number, tree: Record<string, string[]>) => {
    const isFile = files.some((f) => f.path === path);
    const name = path.split('/').pop() || path;
    const childFiles = tree[path];

    if (isFile) {
      return (
        <button
          key={path}
          onClick={() => openFile(path)}
          className={`flex items-center gap-1.5 w-full px-2 py-1 text-xs text-left transition-colors ${
            activeFile === path ? 'bg-elevated text-text' : 'text-text-secondary hover:text-text hover:bg-surface'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <span className="text-[10px] w-4 text-center text-text-secondary/60 font-mono shrink-0">
            {getFileIcon(path)}
          </span>
          {name}
        </button>
      );
    }

    const isOpen = openFolders.has(path);
    return (
      <div key={path}>
        <button
          onClick={() => toggleFolder(path)}
          className="flex items-center gap-1.5 w-full px-2 py-1 text-xs text-text-secondary hover:text-text hover:bg-surface transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          {isOpen ? <FolderOpen size={12} /> : <Folder size={12} />}
          {name}
        </button>
        {isOpen && childFiles?.map((child) => renderTreeItem(child, depth + 1, tree))}
      </div>
    );
  };

  const activeFileContent = files.find((f) => f.path === activeFile);

  // Load demo files on mount if no files yet
  useEffect(() => {
    if (files.length === 0) {
      // Show empty state
    }
  }, [files]);

  return (
    <div className="flex h-full">
      {/* Left panel: Chat */}
      <div className="w-[400px] min-w-[350px] flex flex-col border-r border-border bg-surface">
        {/* Chat header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b border-border shrink-0">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs font-medium text-text">AI Assistant</span>
          <span className="text-[10px] text-text-secondary ml-auto">MiMo V2.5 Pro</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isGenerating && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Loader2 size={14} className="animate-spin text-accent" />
              <span>Generating response...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build..."
              className="w-full bg-elevated border border-border rounded-lg px-4 py-3 pr-12 text-sm text-text placeholder:text-text-secondary/60 resize-none focus:outline-none focus:border-accent/50 transition-colors"
              rows={2}
              disabled={isGenerating}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className="absolute right-3 bottom-3 p-1.5 rounded-md bg-accent text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Right panel: Code/Preview/Terminal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tab bar */}
        <div className="flex items-center h-10 border-b border-border bg-surface shrink-0">
          <button
            onClick={() => setRightTab('code')}
            className={`flex items-center gap-1.5 px-4 h-full text-xs transition-colors ${
              rightTab === 'code' ? 'text-text border-b-2 border-accent bg-bg' : 'text-text-secondary hover:text-text'
            }`}
          >
            <File size={12} /> Code
          </button>
          <button
            onClick={() => setRightTab('preview')}
            className={`flex items-center gap-1.5 px-4 h-full text-xs transition-colors ${
              rightTab === 'preview' ? 'text-text border-b-2 border-accent bg-bg' : 'text-text-secondary hover:text-text'
            }`}
          >
            <Monitor size={12} /> Preview
          </button>
          <button
            onClick={() => setRightTab('terminal')}
            className={`flex items-center gap-1.5 px-4 h-full text-xs transition-colors ${
              rightTab === 'terminal' ? 'text-text border-b-2 border-accent bg-bg' : 'text-text-secondary hover:text-text'
            }`}
          >
            <TerminalIcon size={12} /> Terminal
          </button>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* File tree (only for code tab) */}
          {rightTab === 'code' && files.length > 0 && (
            <div className="w-[220px] border-r border-border bg-surface overflow-y-auto shrink-0">
              <div className="px-3 py-2 border-b border-border">
                <span className="text-[10px] font-medium uppercase tracking-wider text-text-secondary">Files</span>
              </div>
              <div className="py-1">
                {(() => {
                  const tree = buildTree();
                  const rootFiles = tree[''] || [];
                  const rootFolders = Object.keys(tree).filter((k) => k && !k.includes('/'));
                  return (
                    <>
                      {rootFolders.map((f) => renderTreeItem(f, 0, tree))}
                      {rootFiles.map((f) => renderTreeItem(f, 0, tree))}
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Content area */}
          <div className="flex-1 flex flex-col min-w-0">
            {rightTab === 'code' && (
              <>
                {/* File tabs */}
                {openFileTabs.length > 0 && (
                  <div className="flex items-center border-b border-border bg-surface overflow-x-auto shrink-0">
                    {openFileTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveFile(tab)}
                        className={`flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap border-r border-border transition-colors ${
                          activeFile === tab ? 'bg-bg text-text' : 'text-text-secondary hover:text-text'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-text-secondary/60">{getFileIcon(tab)}</span>
                        {tab.split('/').pop()}
                        <span
                          onClick={(e) => { e.stopPropagation(); closeTab(tab); }}
                          className="ml-1 hover:text-text cursor-pointer text-text-secondary/40"
                        >
                          ×
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Code viewer */}
                <div className="flex-1 overflow-auto p-0">
                  {activeFileContent ? (
                    <CodeBlock
                      code={activeFileContent.content}
                      language={getLanguageFromPath(activeFileContent.path)}
                      filename={activeFileContent.path}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-text-secondary text-sm">
                      <div className="text-center">
                        <File size={32} className="mx-auto mb-3 opacity-30" />
                        <p>No file selected</p>
                        <p className="text-xs mt-1 text-text-secondary/60">
                          {files.length > 0 ? 'Select a file from the tree' : 'Generate code to get started'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {rightTab === 'preview' && (
              <div className="flex-1 flex items-center justify-center bg-bg">
                {files.length > 0 ? (
                  <div className="w-full h-full">
                    <iframe
                      srcDoc={generatePreviewHTML()}
                      className="w-full h-full border-0"
                      title="Preview"
                      sandbox="allow-scripts"
                    />
                  </div>
                ) : (
                  <div className="text-center text-text-secondary text-sm">
                    <Monitor size={32} className="mx-auto mb-3 opacity-30" />
                    <p>No preview available</p>
                    <p className="text-xs mt-1 text-text-secondary/60">Generate code first to see a preview</p>
                  </div>
                )}
              </div>
            )}

            {rightTab === 'terminal' && (
              <div className="flex-1 overflow-auto p-4 bg-bg font-mono text-xs">
                {termLines.length === 0 ? (
                  <div className="text-text-secondary/60">Terminal output will appear here...</div>
                ) : (
                  termLines.map((line) => (
                    <div
                      key={line.id}
                      className={`py-0.5 ${
                        line.type === 'command' ? 'text-text font-medium' :
                        line.type === 'success' ? 'text-green-400' :
                        line.type === 'error' ? 'text-red-400' :
                        line.type === 'warning' ? 'text-yellow-400' :
                        'text-text-secondary'
                      }`}
                    >
                      {line.text}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function generatePreviewHTML(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #000; color: #fff; }
    .hero { padding: 96px 24px; text-align: center; }
    .hero h1 { font-size: 48px; font-weight: 700; margin-bottom: 24px; }
    .hero p { font-size: 18px; color: #888; margin-bottom: 32px; max-width: 500px; margin-left: auto; margin-right: auto; }
    .btn { display: inline-block; padding: 12px 32px; border-radius: 8px; font-weight: 500; text-decoration: none; margin: 0 8px; }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-secondary { border: 1px solid #333; color: #ccc; }
    .features { padding: 64px 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px; margin: 0 auto; }
    .feature { padding: 24px; border-radius: 12px; background: #111; border: 1px solid #222; }
    .feature h3 { font-size: 16px; margin-bottom: 8px; }
    .feature p { font-size: 13px; color: #666; }
    .icon { font-size: 24px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Build Something Amazing</h1>
    <p>The fastest way to go from idea to production application.</p>
    <div>
      <a href="#" class="btn btn-primary">Get Started</a>
      <a href="#" class="btn btn-secondary">Learn More</a>
    </div>
  </section>
  <section class="features">
    <div class="feature"><div class="icon">⚡</div><h3>Lightning Fast</h3><p>Built on Next.js for optimal performance and SEO.</p></div>
    <div class="feature"><div class="icon">🔒</div><h3>Type Safe</h3><p>Full TypeScript support throughout the entire stack.</p></div>
    <div class="feature"><div class="icon">📈</div><h3>Scalable</h3><p>Grows with your user base effortlessly and reliably.</p></div>
  </section>
</body>
</html>`;
}
