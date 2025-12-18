// outputNode.js

import { useState, useLayoutEffect, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { evaluateNodeValue } from '../pipelineRuntime';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  useLayoutEffect(() => {
    if (typeof data?.outputName === 'string' && data.outputName !== currName) {
      setCurrName(data.outputName);
    }
    if (typeof data?.outputType === 'string' && data.outputType !== outputType) {
      setOutputType(data.outputType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.outputName, data?.outputType]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'outputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setOutputType(newType);
    updateNodeField(id, 'outputType', newType);
  };

  const resolvedValue = useMemo(
    () => evaluateNodeValue(id, nodes, edges),
    [id, nodes, edges]
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      backgroundColor="#020617"
      borderColor="#a855f7"
      titleColor="#e5e7eb"
      inputHandles={[{ id: `${id}-value`, name: 'value' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e5e7eb' }}>
          <span style={{ fontWeight: '500' }}>Name:</span>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{ 
              padding: '6px', 
              borderRadius: '8px', 
              border: '1px solid rgba(55,65,81,0.95)',
              backgroundColor: 'rgba(15,23,42,0.96)',
              color: '#e5e7eb',
              fontSize: '12px',
              outline: 'none'
            }}
          />
        </label>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e5e7eb' }}>
          <span style={{ fontWeight: '500' }}>Type:</span>
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            style={{ 
              padding: '6px', 
              borderRadius: '8px', 
              border: '1px solid rgba(55,65,81,0.95)',
              backgroundColor: 'rgba(15,23,42,0.96)',
              color: '#e5e7eb',
              fontSize: '12px',
              outline: 'none'
            }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
        <div style={{ fontSize: '11px', padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(24,24,27,0.9)', color: '#e5e7eb', minHeight: '32px', border: '1px solid rgba(55,65,81,0.95)' }}>
          <span style={{ fontWeight: '500' }}>Output preview:</span>{' '}
          <span>{resolvedValue || '(no value)'}</span>
        </div>
      </div>
    </BaseNode>
  );
}
