// inputNode.js

import { useState, useLayoutEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const [currValue, setCurrValue] = useState(data?.value || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Keep local state in sync if React Flow sends updated data
  useLayoutEffect(() => {
    if (typeof data?.inputName === 'string' && data.inputName !== currName) {
      setCurrName(data.inputName);
    }
    if (typeof data?.inputType === 'string' && data.inputType !== inputType) {
      setInputType(data.inputType);
    }
    if (typeof data?.value === 'string' && data.value !== currValue) {
      setCurrValue(data.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.inputName, data?.inputType, data?.value]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'inputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    updateNodeField(id, 'inputType', newType);
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    setCurrValue(newValue);
    updateNodeField(id, 'value', newValue);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      backgroundColor="#0f172a"
      borderColor="#38bdf8"
      titleColor="#e5e7eb"
      outputHandles={[{ id: `${id}-value`, name: 'value' }]}
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
            value={inputType} 
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
            <option value="File">File</option>
          </select>
        </label>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e5e7eb' }}>
          <span style={{ fontWeight: '500' }}>Value:</span>
          <textarea
            value={currValue}
            onChange={handleValueChange}
            style={{
              padding: '6px',
              borderRadius: '8px',
              border: '1px solid rgba(55,65,81,0.95)',
              backgroundColor: 'rgba(15,23,42,0.96)',
              color: '#e5e7eb',
              minHeight: '40px',
              fontSize: '12px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none'
            }}
            placeholder="Enter input value..."
          />
        </label>
      </div>
    </BaseNode>
  );
}
