// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      backgroundColor="#FFF3E0"
      borderColor="#FF9800"
      titleColor="#E65100"
      inputHandles={[
        { id: `${id}-system`, name: 'system', top: '33%' },
        { id: `${id}-prompt`, name: 'prompt', top: '67%' }
      ]}
      outputHandles={[{ id: `${id}-response`, name: 'response' }]}
    >
      <div style={{ fontSize: '12px', color: '#666' }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
}
