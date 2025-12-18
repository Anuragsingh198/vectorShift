// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      backgroundColor="#020617"
      borderColor="#f97316"
      titleColor="#fed7aa"
      inputHandles={[
        { id: `${id}-system`, name: 'system', top: '33%' },
        { id: `${id}-prompt`, name: 'prompt', top: '67%' }
      ]}
      outputHandles={[{ id: `${id}-response`, name: 'response' }]}
    >
      <div style={{ fontSize: '12px', color: '#e5e7eb' }}>
        Connect system and prompt inputs to call your model.
      </div>
    </BaseNode>
  );
}
