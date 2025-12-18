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
      backgroundColor="#020617"
      borderColor="#f472b6"
      titleColor="#f9a8d4"
      inputHandles={[{ id: `${id}-data`, name: 'data' }]}
      outputHandles={[
        { id: `${id}-pass`, name: 'pass', top: '33%' },
        { id: `${id}-fail`, name: 'fail', top: '67%' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e5e7eb' }}>
          <span style={{ fontWeight: '500' }}>Condition:</span>
          <select 
            value={filterCondition} 
            onChange={(e) => setFilterCondition(e.target.value)}
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
