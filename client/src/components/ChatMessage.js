import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BiBot } from 'react-icons/bi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ role, content }) => {
  const isUser = role === 'user';

  const avatar = isUser ? (
    <div className="w-8 h-8 rounded-md bg-gpt-green text-white flex items-center justify-center font-bold text-sm">
      U
    </div>
  ) : (
    <div className="w-8 h-8 rounded-md bg-gpt-light text-white flex items-center justify-center">
      <BiBot className="w-5 h-5" />
    </div>
  );

  return (
    <div className={`py-6 border-b border-gray-700/50 ${isUser ? 'bg-gpt-medium' : 'bg-gpt-light'}`}>
      <div className="max-w-4xl mx-auto flex px-4">
        <div className="mr-5 flex-shrink-0">{avatar}</div>
        <div className="text-white w-full">
          {/* ✅ Moved className to wrapper div */}
          <div className="prose prose-invert max-w-none leading-relaxed">
            <ReactMarkdown
              children={content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={coldarkDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-800 px-1 py-0.5 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
