// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.currentTarget.style.cursor = 'grab';
  };

  const paletteConfig = {
    customInput: {
      gradient:
        'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(45,212,191,0.85))',
      iconBg: 'rgba(15,23,42,0.85)',
      description: 'Expose data into the pipeline',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7H17"
            stroke="url(#grad-input-1)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M7 12H17"
            stroke="url(#grad-input-2)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 17H17"
            stroke="url(#grad-input-3)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M6 16L4 18L2 16"
            stroke="#22c55e"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="grad-input-1"
              x1="7"
              y1="7"
              x2="17"
              y2="7"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient
              id="grad-input-2"
              x1="7"
              y1="12"
              x2="17"
              y2="12"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient
              id="grad-input-3"
              x1="10"
              y1="17"
              x2="17"
              y2="17"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22c55e" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    text: {
      gradient:
        'linear-gradient(135deg, rgba(34,197,94,0.95), rgba(45,212,191,0.9))',
      iconBg: 'rgba(15,23,42,0.85)',
      description: 'Template and transform text',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="3"
            stroke="#bbf7d0"
            strokeWidth="1.6"
          />
          <path
            d="M8 10H16"
            stroke="#22c55e"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8 14H14"
            stroke="#22c55e"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M9 7H15"
            stroke="#bbf7d0"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    llm: {
      gradient:
        'linear-gradient(135deg, rgba(249,115,22,0.95), rgba(244,63,94,0.95))',
      iconBg: 'rgba(15,23,42,0.9)',
      description: 'Call your language model',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="6.5"
            stroke="#fed7aa"
            strokeWidth="1.6"
          />
          <circle cx="9" cy="11" r="0.9" fill="#fb923c" />
          <circle cx="15" cy="11" r="0.9" fill="#fb923c" />
          <path
            d="M9.5 14C9.9 14.7 10.9 15.5 12 15.5C13.1 15.5 14.1 14.7 14.5 14"
            stroke="#fecaca"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M6 9.5C6.7 7.5 8.6 6.25 10.7 6"
            stroke="#fed7aa"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M17.9 9.5C17.2 7.5 15.3 6.25 13.2 6"
            stroke="#fed7aa"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    customOutput: {
      gradient:
        'linear-gradient(135deg, rgba(168,85,247,0.95), rgba(56,189,248,0.9))',
      iconBg: 'rgba(15,23,42,0.9)',
      description: 'Surface results from the graph',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5H19V10.5C19 14.0899 16.0899 17 12.5 17C8.91015 17 6 14.0899 6 10.5V5Z"
            stroke="#e0e7ff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12L12 9L15 12"
            stroke="#a855f7"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9V15"
            stroke="#a855f7"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  };

  const palette = paletteConfig[type] || paletteConfig.customInput;

  const baseStyle = {
    cursor: 'grab',
    minWidth: '130px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '16px',
    background: palette.gradient,
    justifyContent: 'flex-start',
    padding: '10px 12px',
    boxShadow: '0 18px 40px rgba(15,23,42,0.95)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease',
    border: '1px solid rgba(148,163,184,0.85)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) translateZ(0)';
        e.currentTarget.style.boxShadow =
          '0 26px 55px rgba(15,23,42,1), 0 0 0 1px rgba(148,163,184,0.95)';
        e.currentTarget.style.filter = 'brightness(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
        e.currentTarget.style.boxShadow = baseStyle.boxShadow;
        e.currentTarget.style.filter = 'brightness(1)';
      }}
      draggable
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '999px',
          backgroundColor: palette.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          boxShadow: '0 0 0 1px rgba(15,23,42,0.9), 0 8px 18px rgba(0,0,0,0.85)',
        }}
      >
        {palette.icon}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            color: '#f9fafb',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: '#e5e7eb',
            fontSize: '11px',
            opacity: 0.85,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {palette.description}
        </span>
      </div>
    </div>
  );
};
