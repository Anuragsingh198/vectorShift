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
      backgroundColor="#E0F2F1"
      borderColor="#009688"
      titleColor="#00695C"
      inputHandles={[{ id: `${id}-input`, name: 'input' }]}
      outputHandles={[
        { id: `${id}-output1`, name: 'output1', top: '33%' },
        { id: `${id}-output2`, name: 'output2', top: '67%' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '500' }}>Delimiter:</span>
          <input
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder=","
          />
        </label>
      </div>
    </BaseNode>
  );
}
