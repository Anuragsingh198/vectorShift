// BaseNode.js - Abstract base component for all nodes
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  children,
  inputHandles = [],
  outputHandles = [],
  width = 200,
  height = 80,
  backgroundColor = '#ffffff',
  borderColor = '#e0e0e0',
  titleColor = '#333333'
}) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const nodeType = data?.nodeType || title || 'Node';

  const accentColor = borderColor || '#38bdf8';
  const softAccent = `${accentColor}55`;
  const softBackgroundTint = `${backgroundColor}33`;

  const nodeStyle = {
    width: width,
    minHeight: height,
    background: `
      radial-gradient(circle at 0% 0%, ${softAccent}, transparent 55%),
      radial-gradient(circle at 100% 100%, ${softBackgroundTint}, transparent 55%),
      linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))
    `,
    border: '1px solid rgba(148,163,184,0.65)',
    borderRadius: '18px',
    padding: '12px 12px 10px 12px',
    boxShadow: '0 18px 45px rgba(15,23,42,0.95)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'relative',
    color: '#e5e7eb',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    overflow: 'hidden'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
    paddingRight: '26px',
    gap: '8px'
  };

  const titleBlockStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: 0
  };

  const iconCircleStyle = {
    width: 24,
    height: 24,
    borderRadius: '999px',
    background: `radial-gradient(circle at 30% 0%, ${softAccent}, rgba(15,23,42,0.95))`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 22px rgba(15,23,42,0.9)'
  };

  const nodeTitleStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: titleColor,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  };

  const nodeSubtitleStyle = {
    fontSize: '10px',
    color: '#9ca3af',
    marginTop: '1px',
    textTransform: 'none'
  };

  const badgeStyle = {
    padding: '3px 8px',
    borderRadius: '999px',
    border: '1px solid rgba(148,163,184,0.7)',
    backgroundColor: 'rgba(15,23,42,0.9)',
    fontSize: '9px',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    whiteSpace: 'nowrap',
    maxWidth: '40%',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this ${title} node?`)) {
      deleteNode(id);
    }
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 0%, #fecaca, #b91c1c)',
    border: '1px solid rgba(15,23,42,0.95)',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
    opacity: 0.85,
    boxShadow: '0 10px 22px rgba(127,29,29,0.95)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease, filter 0.18s ease',
    zIndex: 10
  };

  return (
    <div style={nodeStyle}>
      {/* Delete Button */}
      <button
        style={deleteButtonStyle}
        onClick={handleDelete}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'scale(1.08) translateZ(0)';
          e.currentTarget.style.boxShadow =
            '0 14px 28px rgba(127,29,29,1)';
          e.currentTarget.style.filter = 'brightness(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.85';
          e.currentTarget.style.transform = 'scale(1) translateZ(0)';
          e.currentTarget.style.boxShadow =
            '0 10px 22px rgba(127,29,29,0.95)';
          e.currentTarget.style.filter = 'brightness(1)';
        }}
        title="Delete node (or press Delete key)"
      >
        ×
      </button>

      {/* Input Handles */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `${id}-${handle.name || `input-${index}`}`}
          style={handle.style || { top: handle.top || '50%' }}
        />
      ))}

      {/* Title / header */}
      {title && (
        <div style={headerStyle}>
          <div style={titleBlockStyle}>
            <div style={iconCircleStyle}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="5"
                  width="6"
                  height="6"
                  rx="1.4"
                  stroke="#e5e7eb"
                  strokeWidth="1.4"
                />
                <rect
                  x="14"
                  y="13"
                  width="6"
                  height="6"
                  rx="1.4"
                  stroke="#e5e7eb"
                  strokeWidth="1.4"
                />
                <path
                  d="M10 8.5L14 10.5L17 9"
                  stroke={accentColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={nodeTitleStyle}>
                {title}
              </div>
              <div style={nodeSubtitleStyle}>
                {nodeType}
              </div>
            </div>
          </div>
          <div style={badgeStyle}>
            NODE
          </div>
        </div>
      )}

      {/* Children Content */}
      {children}

      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `${id}-${handle.name || `output-${index}`}`}
          style={handle.style || { top: handle.top || '50%' }}
        />
      ))}
    </div>
  );
};
