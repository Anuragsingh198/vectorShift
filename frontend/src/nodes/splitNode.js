// splitNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const SplitNode = ({ id, data }) => {
  const [delimiter, setDelimiter] = useState(data?.delimiter || ',');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Split"
      backgroundColor="#020617"
      borderColor="#14b8a6"
      titleColor="#ccfbf1"
      inputHandles={[{ id: `${id}-input`, name: 'input' }]}
      outputHandles={[
        { id: `${id}-output1`, name: 'output1', top: '33%' },
        { id: `${id}-output2`, name: 'output2', top: '67%' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e5e7eb' }}>
          <span style={{ fontWeight: '500' }}>Delimiter:</span>
          <input
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            style={{ 
              padding: '6px', 
              borderRadius: '8px', 
              border: '1px solid rgba(55,65,81,0.95)',
              backgroundColor: 'rgba(15,23,42,0.96)',
              color: '#e5e7eb',
              fontSize: '12px',
              outline: 'none'
            }}
            placeholder=","
          />
        </label>
      </div>
    </BaseNode>
  );
}
