// filterNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterCondition, setFilterCondition] = useState(data?.filterCondition || 'contains');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      backgroundColor="#FCE4EC"
      borderColor="#E91E63"
      titleColor="#C2185B"
      inputHandles={[{ id: `${id}-data`, name: 'data' }]}
      outputHandles={[
        { id: `${id}-pass`, name: 'pass', top: '33%' },
        { id: `${id}-fail`, name: 'fail', top: '67%' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '500' }}>Condition:</span>
          <select 
            value={filterCondition} 
            onChange={(e) => setFilterCondition(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="contains">Contains</option>
            <option value="startsWith">Starts With</option>
            <option value="endsWith">Ends With</option>
            <option value="equals">Equals</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
