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
  const nodeStyle = {
    width: width,
    minHeight: height,
    backgroundColor: backgroundColor,
    border: `2px solid ${borderColor}`,
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'relative'
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: titleColor,
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this ${title} node?`)) {
      deleteNode(id);
    }
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#ff4444',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    opacity: 0.7,
    transition: 'all 0.2s ease',
    zIndex: 10
  };

  return (
    <div style={nodeStyle}>
      {/* Delete Button */}
      <button
        style={deleteButtonStyle}
        onClick={handleDelete}
        onMouseEnter={(e) => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '0.7';
          e.target.style.transform = 'scale(1)';
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

      {/* Title */}
      {title && (
        <div style={titleStyle}>
          {title}
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
