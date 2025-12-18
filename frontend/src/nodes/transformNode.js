// transformNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      backgroundColor="#E1F5FE"
      borderColor="#00BCD4"
      titleColor="#00838F"
      inputHandles={[{ id: `${id}-input`, name: 'input' }]}
      outputHandles={[{ id: `${id}-output`, name: 'output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '500' }}>Type:</span>
          <select 
            value={transformType} 
            onChange={(e) => setTransformType(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
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
