// ResponseModal.js - Beautiful modal for displaying responses

import { useEffect } from 'react';

export const ResponseModal = ({ isOpen, onClose, result, error }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease'
  };

  const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    animation: 'slideUp 0.3s ease',
    position: 'relative'
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '20px',
    color: error ? '#D32F2F' : '#1976D2',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const resultItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e0e0e0'
  };

  const labelStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#666'
  };

  const valueStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333'
  };

  const badgeStyle = (isDag) => ({
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: isDag ? '#E8F5E9' : '#FFEBEE',
    color: isDag ? '#2E7D32' : '#C62828'
  });

  const closeButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease'
  };

  const actionButtonStyle = {
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#2196F3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease'
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div style={overlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f5f5f5';
              e.target.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#999';
            }}
          >
            ×
          </button>

          {error ? (
            <>
              <div style={headerStyle}>
                <span>⚠️</span>
                <span>Error</span>
              </div>
              <div style={{ color: '#666', marginBottom: '20px' }}>
                {error}
              </div>
            </>
          ) : result ? (
            <>
              <div style={headerStyle}>
                <span>✓</span>
                <span>Pipeline Analysis Results</span>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={resultItemStyle}>
                  <span style={labelStyle}>Number of Nodes:</span>
                  <span style={valueStyle}>{result.num_nodes}</span>
                </div>
                <div style={resultItemStyle}>
                  <span style={labelStyle}>Number of Edges:</span>
                  <span style={valueStyle}>{result.num_edges}</span>
                </div>
                <div style={{ ...resultItemStyle, borderBottom: 'none', paddingTop: '15px' }}>
                  <span style={labelStyle}>Is DAG:</span>
                  <span style={badgeStyle(result.is_dag)}>
                    {result.is_dag ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
              </div>
            </>
          ) : null}

          <button
            style={actionButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1976D2';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2196F3';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
