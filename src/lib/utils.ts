export function getLanguageFromPath(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
    json: 'json', css: 'css', html: 'html', md: 'markdown', mdx: 'markdown',
    py: 'python', rs: 'rust', go: 'go', sql: 'sql', yaml: 'yaml', yml: 'yaml',
    toml: 'toml', sh: 'bash', bash: 'bash', env: 'bash',
  };
  return map[ext] || 'text';
}

export function highlightCode(code: string, language: string): string {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments
  html = html.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
  html = html.replace(/(#.*$)/gm, function(match) {
    if (language === 'json') return match;
    return '<span class="code-comment">' + match + '</span>';
  });

  // Strings
  html = html.replace(/(&quot;[^&]*?&quot;)/g, '<span class="code-string">$1</span>');
  html = html.replace(/(&#x27;[^&]*?&#x27;)/g, '<span class="code-string">$1</span>');
  html = html.replace(/('[^']*?')/g, '<span class="code-string">$1</span>');
  html = html.replace(/("[^"]*?")/g, '<span class="code-string">$1</span>');
  html = html.replace(/(`[^`]*?`)/g, '<span class="code-string">$1</span>');

  // Keywords
  const keywords = [
    'import', 'export', 'from', 'default', 'const', 'let', 'var', 'function',
    'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
    'continue', 'new', 'class', 'extends', 'super', 'this', 'typeof', 'instanceof',
    'in', 'of', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'yield',
    'type', 'interface', 'enum', 'implements', 'abstract', 'readonly', 'private',
    'protected', 'public', 'static', 'as', 'is', 'keyof', 'declare',
    'true', 'false', 'null', 'undefined', 'void', 'never', 'any', 'unknown',
  ];
  const keywordPattern = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
  html = html.replace(keywordPattern, '<span class="code-keyword">$1</span>');

  // Types
  const types = [
    'string', 'number', 'boolean', 'object', 'Array', 'Promise', 'Record',
    'Partial', 'Required', 'Pick', 'Omit', 'React', 'ReactNode',
    'HTMLElement', 'Document', 'Window', 'Response', 'Request',
  ];
  const typePattern = new RegExp('\\b(' + types.join('|') + ')\\b', 'g');
  html = html.replace(typePattern, '<span class="code-type">$1</span>');

  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');

  // Operators
  html = html.replace(/(=&gt;|===|!==|==|!=|&lt;=|&gt;=|\+\+|--|&&|\|\||\?\?|\?\.)/g,
    '<span class="code-operator">$1</span>');

  return html;
}

export function getFileIcon(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  const iconMap: Record<string, string> = {
    ts: 'TS', tsx: 'TX', js: 'JS', jsx: 'JX',
    json: '{}', css: '#', html: '<>', md: 'M',
    py: 'PY', rs: 'RS', go: 'GO', sql: 'S',
    yaml: 'Y', yml: 'Y', toml: 'T', sh: '>',
    env: 'E', gitignore: 'G',
  };
  if (path.includes('package.json')) return '📦';
  if (path.includes('tsconfig')) return '⚙️';
  if (path.includes('.gitignore')) return 'G';
  return iconMap[ext] || '📄';
}

export function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}
