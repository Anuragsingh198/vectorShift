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
    background:
      'radial-gradient(circle at 0% 0%, rgba(56,189,248,0.12), transparent 45%), radial-gradient(circle at 100% 0%, rgba(249,115,22,0.12), transparent 45%), rgba(2,6,23,0.92)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)'
  };

  const modalStyle = {
    background:
      'radial-gradient(circle at 0% 0%, rgba(56,189,248,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(168,85,247,0.18), transparent 55%), rgba(15,23,42,0.98)',
    borderRadius: '22px',
    padding: '22px 22px 20px 22px',
    maxWidth: '540px',
    width: 'min(540px, 95vw)',
    boxShadow: '0 32px 90px rgba(0,0,0,0.95), 0 0 0 1px rgba(148,163,184,0.6)',
    animation: 'slideUp 0.25s ease',
    position: 'relative',
    color: '#e5e7eb',
    boxSizing: 'border-box',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    overflow: 'hidden'
  };

  const headerStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: error ? '#fecaca' : '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const resultItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid rgba(55,65,81,0.85)'
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '500',
    color: '#9ca3af'
  };

  const valueStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#e5e7eb'
  };

  const badgeStyle = (isDag) => ({
    padding: '6px 14px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: '600',
    backgroundColor: isDag ? 'rgba(22,163,74,0.12)' : 'rgba(248,113,113,0.12)',
    color: isDag ? '#bbf7d0' : '#fecaca',
    border: isDag
      ? '1px solid rgba(22,163,74,0.55)'
      : '1px solid rgba(248,113,113,0.6)'
  });

  const closeButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background:
      'radial-gradient(circle at 30% 0%, #fecaca, #b91c1c)',
    border: '1px solid rgba(15,23,42,0.95)',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#fef2f2',
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition:
      'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease, opacity 0.18s ease',
    boxShadow: '0 12px 28px rgba(127,29,29,0.95)',
    opacity: 0.9
  };

  const actionButtonStyle = {
    marginTop: '18px',
    padding: '10px 22px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#f9fafb',
    background:
      'linear-gradient(135deg, #38bdf8, #6366f1)',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    width: '100%',
    transition:
      'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease, background 0.18s ease',
    boxShadow: '0 20px 55px rgba(37,99,235,0.9)'
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
            transform: translateY(18px) scale(0.98);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <div style={overlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                'scale(1.06) translateZ(0)';
              e.currentTarget.style.boxShadow =
                '0 16px 34px rgba(127,29,29,1)';
              e.currentTarget.style.filter = 'brightness(1.06)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'scale(1) translateZ(0)';
              e.currentTarget.style.boxShadow =
                '0 12px 28px rgba(127,29,29,0.95)';
              e.currentTarget.style.filter = 'brightness(1)';
              e.currentTarget.style.opacity = '0.9';
            }}
          >
            ×
          </button>

          {error ? (
            <>
              <div style={headerStyle}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '999px',
                    background:
                      'radial-gradient(circle at 30% 0%, #fecaca, #b91c1c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 28px rgba(127,29,29,0.9)'
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#fee2e2"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 8V13"
                      stroke="#fee2e2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="16"
                      r="1"
                      fill="#fee2e2"
                    />
                  </svg>
                </span>
                <span>Error</span>
              </div>
              <div style={{ color: '#e5e7eb', marginBottom: '16px', fontSize: '13px', lineHeight: 1.5 }}>
                {error}
              </div>
            </>
          ) : result ? (
            <>
              <div style={headerStyle}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '999px',
                    background:
                      'radial-gradient(circle at 30% 0%, #bbf7d0, #16a34a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 28px rgba(22,101,52,0.9)'
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#dcfce7"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M8.5 12.5L11 15L15.5 9.5"
                      stroke="#dcfce7"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Pipeline analysis</span>
              </div>
              
              <div style={{ marginBottom: '4px', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                Summary
              </div>

              <div style={{ marginBottom: '14px' }}>
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
              e.currentTarget.style.transform =
                'translateY(-2px) translateZ(0)';
              e.currentTarget.style.boxShadow =
                '0 24px 65px rgba(37,99,235,1)';
              e.currentTarget.style.filter = 'brightness(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'translateY(0) translateZ(0)';
              e.currentTarget.style.boxShadow =
                '0 20px 55px rgba(37,99,235,0.9)';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
