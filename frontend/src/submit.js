
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ResponseModal } from './ResponseModal';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({ nodes: state.nodes, edges: state.edges }),
        shallow
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        
        try {
            if (nodes.length === 0) {
                setError('Please add at least one node to the pipeline before submitting.');
                setIsModalOpen(true);
                setIsLoading(false);
                return;
            }

            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                }))
            };

            const formData = new FormData();
            formData.append('pipeline', JSON.stringify(pipelineData));

            const response = await fetch('http://127.0.0.1:8001/pipelines/parse', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const resultData = await response.json();
            
            if (resultData.error) {
                setError(resultData.error);
            } else {
                setResult(resultData);
            }
            
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setError(`Error submitting pipeline: ${error.message}\n\nMake sure the backend server is running on http://127.0.0.1:8001`);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background:
                        'linear-gradient(180deg, rgba(15,23,42,0.97), rgba(15,23,42,0.98))',
                    borderRadius: '20px',
                    boxShadow:
                        '0 -22px 60px rgba(0,0,0,0.9), 0 0 0 1px rgba(148,163,184,0.55)',
                    gap: '14px',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: '50%',
                    }}
                >
                    <span
                        style={{
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#9ca3af',
                            fontWeight: 600,
                        }}
                    >
                        Run Pipeline
                    </span>
                    <span
                        style={{
                            fontSize: '11px',
                            color: '#6b7280',
                        }}
                    >
                        Execute the current graph and inspect the LLM response in a modal.
                    </span>
                </div>
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{
                        padding: '10px 26px',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#f9fafb',
                        background: isLoading
                            ? 'linear-gradient(135deg, rgba(59,130,246,0.55), rgba(37,99,235,0.65))'
                            : 'linear-gradient(135deg, #38bdf8, #6366f1)',
                        border: 'none',
                        borderRadius: '999px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 22px 55px rgba(37,99,235,0.8)',
                        transition:
                            'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease, background 0.18s ease',
                        opacity: isLoading ? 0.85 : 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.transform =
                                'translateY(-2px) translateZ(0)';
                            e.currentTarget.style.boxShadow =
                                '0 26px 70px rgba(37,99,235,1)';
                            e.currentTarget.style.filter = 'brightness(1.05)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.transform =
                                'translateY(0) translateZ(0)';
                            e.currentTarget.style.boxShadow =
                                '0 22px 55px rgba(37,99,235,0.8)';
                            e.currentTarget.style.filter = 'brightness(1)';
                        }
                    }}
                >
                    {isLoading && (
                        <span style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            border: '2px solid #fff',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite'
                        }} />
                    )}
                    {!isLoading && (
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 18,
                                height: 18,
                            }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 19L10.5 13.5"
                                    stroke="#bfdbfe"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.5 20L12 21L19 4L3 11L7 12.5L8.5 20Z"
                                    stroke="#eff6ff"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 21L13.5 16.5L10.5 13.5"
                                    stroke="#93c5fd"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    )}
                    {isLoading ? 'Submitting...' : 'Run pipeline'}
                </button>
                {nodes.length > 0 && (
                    <span
                        style={{
                            fontSize: '12px',
                            color: '#9ca3af',
                            padding: '6px 10px',
                            borderRadius: '999px',
                            backgroundColor: 'rgba(15,23,42,0.8)',
                            border: '1px solid rgba(55,65,81,0.85)',
                        }}
                    >
                        {nodes.length} node{nodes.length !== 1 ? 's' : ''}, {edges.length} edge{edges.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>
            <ResponseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                result={result}
                error={error}
            />
        </>
    );
}
