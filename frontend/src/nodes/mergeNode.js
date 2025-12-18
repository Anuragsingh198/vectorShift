// mergeNode.js

import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      backgroundColor="#FFF9C4"
      borderColor="#FFC107"
      titleColor="#F57C00"
      inputHandles={[
        { id: `${id}-input1`, name: 'input1', top: '25%' },
        { id: `${id}-input2`, name: 'input2', top: '50%' },
        { id: `${id}-input3`, name: 'input3', top: '75%' }
      ]}
      outputHandles={[{ id: `${id}-merged`, name: 'merged' }]}
    >
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        Combines multiple inputs into one output
      </div>
    </BaseNode>
  );
}
