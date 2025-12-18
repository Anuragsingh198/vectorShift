// transformNode.js

import { useState, useLayoutEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useLayoutEffect(() => {
    if (typeof data?.transformType === 'string' && data.transformType !== transformType) {
      setTransformType(data.transformType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.transformType]);

  const handleChange = (e) => {
    const newType = e.target.value;
    setTransformType(newType);
    updateNodeField(id, 'transformType', newType);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      backgroundColor="#020617"
      borderColor="#0ea5e9"
      titleColor="#e0f2fe"
      inputHandles={[{ id: `${id}-input`, name: 'input' }]}
      outputHandles={[{ id: `${id}-output`, name: 'output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e5e7eb' }}>
          <span style={{ fontWeight: '500' }}>Type:</span>
          <select 
            value={transformType} 
            onChange={handleChange}
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
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="reverse">Reverse</option>
            <option value="trim">Trim</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
