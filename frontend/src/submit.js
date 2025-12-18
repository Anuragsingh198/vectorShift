
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

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
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
            setError(`Error submitting pipeline: ${error.message}\n\nMake sure the backend server is running on http://127.0.0.1:8000`);
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
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '15px',
                backgroundColor: '#fff',
                borderTop: '2px solid #e0e0e0',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
                gap: '10px'
            }}>
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{
                        padding: '12px 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#fff',
                        backgroundColor: isLoading ? '#90CAF9' : '#2196F3',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'all 0.2s ease',
                        opacity: isLoading ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.target.style.backgroundColor = '#1976D2';
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isLoading) {
                            e.target.style.backgroundColor = '#2196F3';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
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
                    {isLoading ? 'Submitting...' : 'Submit Pipeline'}
                </button>
                {nodes.length > 0 && (
                    <span style={{ fontSize: '14px', color: '#666' }}>
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
