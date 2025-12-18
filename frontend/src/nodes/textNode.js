// textNode.js

import { useState, useLayoutEffect, useRef, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { evaluateNodeValue } from '../pipelineRuntime';

// Helper: extract unique JS identifiers wrapped in {{ }}
// e.g. "Hello {{ input }} and {{user_name}}" -> ["input", "user_name"]
const extractVariables = (text) => {
  if (!text) return [];
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const found = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    const name = match[1].trim();
    if (name) {
      found.add(name);
    }
  }

  return Array.from(found);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(
    typeof data?.text === 'string' && data.text.length > 0 ? data.text : '{{ input }}'
  );
  // Keep node width fixed so only height grows
  const [nodeWidth] = useState(260);
  const [nodeHeight, setNodeHeight] = useState(90);
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  // Keep local text in sync if React Flow passes updated data
  useLayoutEffect(() => {
    if (typeof data?.text === 'string' && data.text !== currText) {
      setCurrText(data.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.text]);

  // Compute variables from current text
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Resolved text based on connected input values (Input -> Text)
  const resolvedText = useMemo(
    () => evaluateNodeValue(id, nodes, edges),
    [id, nodes, edges]
  );

  // Auto-size the node based on textarea content (height only)
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height so scroll measurements are correct
    textarea.style.height = 'auto';

    const scrollHeight = textarea.scrollHeight;

    // Let the textarea grow up to this many pixels, then become scrollable
    const MAX_TEXTAREA_HEIGHT = 160;
    const MIN_NODE_HEIGHT = 80;
    const MAX_NODE_HEIGHT = 240;

    const clampedTextHeight = Math.min(scrollHeight, MAX_TEXTAREA_HEIGHT);
    textarea.style.height = `${clampedTextHeight}px`;

    // Node height follows the textarea height, but is also clamped
    const newHeight = Math.max(
      MIN_NODE_HEIGHT,
      Math.min(clampedTextHeight + 50, MAX_NODE_HEIGHT)
    );

    setNodeHeight(newHeight);
  }, [currText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  // Create one input handle per variable on the left side
  const inputHandles = variables.map((name, index) => ({
    id: `${id}-${name}`,
    name,
    // Evenly distribute handles vertically from top to bottom
    top: `${((index + 1) * 100) / (variables.length + 1)}%`
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      backgroundColor="#020617"
      borderColor="#22c55e"
      titleColor="#e5e7eb"
      width={nodeWidth}
      height={nodeHeight}
      inputHandles={inputHandles}
      outputHandles={[{ id: `${id}-output`, name: 'output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e5e7eb' }}>
          <span style={{ fontWeight: '500' }}>Text:</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              padding: '6px',
              borderRadius: '8px',
              border: '1px solid rgba(55,65,81,0.95)',
              backgroundColor: 'rgba(15,23,42,0.96)',
              color: '#e5e7eb',
              resize: 'none',
              minHeight: '40px',
              fontFamily: 'inherit',
              fontSize: '12px',
              width: '100%',
              boxSizing: 'border-box',
              overflowY: 'auto',
              outline: 'none'
            }}
            placeholder="Enter text... Use {{ variableName }} to create input handles"
          />
        </label>
        {variables.length > 0 && (
          <div style={{ fontSize: '10px', color: '#9ca3af', fontStyle: 'italic' }}>
            Variables: {variables.join(', ')}
          </div>
        )}
        <div style={{ fontSize: '11px', padding: '4px 6px', borderRadius: '8px', backgroundColor: 'rgba(22,163,74,0.15)', color: '#bbf7d0', minHeight: '26px', border: '1px solid rgba(22,163,74,0.45)' }}>
          <span style={{ fontWeight: '500' }}>Preview:</span>{' '}
          <span>{resolvedText}</span>
        </div>
      </div>
    </BaseNode>
  );
}
