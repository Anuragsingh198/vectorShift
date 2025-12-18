// conditionNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [threshold, setThreshold] = useState(data?.threshold || '0');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      backgroundColor="#F1F8E9"
      borderColor="#8BC34A"
      titleColor="#558B2F"
      inputHandles={[{ id: `${id}-value`, name: 'value' }]}
      outputHandles={[
        { id: `${id}-true`, name: 'true', top: '33%' },
        { id: `${id}-false`, name: 'false', top: '67%' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '500' }}>Operator:</span>
          <select 
            value={operator} 
            onChange={(e) => setOperator(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="==">Equals (==)</option>
            <option value="!=">Not Equals (!=)</option>
            <option value=">">Greater Than (&gt;)</option>
            <option value="<">Less Than (&lt;)</option>
            <option value=">=">Greater or Equal (&gt;=)</option>
            <option value="<=">Less or Equal (&lt;=)</option>
          </select>
        </label>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '500' }}>Threshold:</span>
          <input
            type="text"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="0"
          />
        </label>
      </div>
    </BaseNode>
  );
}
