function renderInline(text) {
  return text;
}

export default function MarkdownArticle({ content }) {
  const lines = content.split('\n');
  const blocks = [];
  let list = [];

  const flushList = () => {
    if (!list.length) return;
    blocks.push({ type: 'list', items: list });
    list = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }
    if (trimmed.startsWith('- ')) {
      list.push(trimmed.slice(2));
      return;
    }
    flushList();
    if (trimmed.startsWith('##### ')) {
      blocks.push({ type: 'h5', text: trimmed.slice(6) });
    } else if (trimmed.startsWith('#### ')) {
      blocks.push({ type: 'h4', text: trimmed.slice(5) });
    } else if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4) });
    } else if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3) });
    } else {
      blocks.push({ type: 'p', text: trimmed });
    }
  });
  flushList();

  return (
    <div className="space-y-5 break-words">
      {blocks.map((block, index) => {
        if (block.type === 'h2') {
          return (
            <h2 key={index} className="font-display text-2xl sm:text-3xl font-bold text-white pt-4">
              {renderInline(block.text)}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3 key={index} className="font-display text-xl sm:text-2xl font-bold text-white pt-3">
              {renderInline(block.text)}
            </h3>
          );
        }
        if (block.type === 'h4' || block.type === 'h5') {
          return (
            <h4 key={index} className="font-display text-lg sm:text-xl font-semibold text-sky-100 pt-2">
              {renderInline(block.text)}
            </h4>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="space-y-3 pl-5 list-disc marker:text-sky-400">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-neutral-300 leading-7 sm:leading-8 text-sm sm:text-base">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
