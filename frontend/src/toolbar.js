// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: '10px 14px 8px 14px',
        borderRadius: '22px',
        background:
          'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
        boxShadow:
          '0 24px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(148,163,184,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '999px',
            background:
              'radial-gradient(circle at 30% 0%, #38bdf8, transparent 60%), radial-gradient(circle at 80% 80%, #a855f7, transparent 65%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 32px rgba(0,0,0,0.85)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4"
              y="5"
              width="6"
              height="6"
              rx="1.5"
              stroke="#e5e7eb"
              strokeWidth="1.4"
            />
            <rect
              x="14"
              y="13"
              width="6"
              height="6"
              rx="1.5"
              stroke="#e5e7eb"
              strokeWidth="1.4"
            />
            <path
              d="M10 8.5L14 10.5L17 9"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 0,
          }}
        >
          <span
            style={{
              margin: 0,
              color: '#e5e7eb',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Node Palette
          </span>
          <span
            style={{
              color: '#9ca3af',
              fontSize: '11px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            Drag blocks to compose your LLM workflow
          </span>
        </div>
      </div>
      <div
        style={{
          marginTop: '2px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'flex-end',
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
      </div>
    </div>
  );
};
