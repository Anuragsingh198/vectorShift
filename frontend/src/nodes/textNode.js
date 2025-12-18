// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

// Helper function to extract variables from text (e.g., "{{ variableName }}")
const extractVariables = (text) => {
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const variables = [];
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const varName = match[1].trim();
    if (varName && !variables.includes(varName)) {
      variables.push(varName);
    }
  }
  
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth] = useState(200);
  const [nodeHeight, setNodeHeight] = useState(80);
  const textareaRef = useRef(null);
  const { nodes, updateNodeField } = useStore();

  // Extract variables from text
  const variables = extractVariables(currText);

  // Update node dimensions based on text content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const scrollHeight = textarea.scrollHeight;
      const scrollWidth = Math.max(textarea.scrollWidth, 200);
      
      // Calculate height: base height + text height (min 80px, max 300px)
      const newHeight = Math.min(Math.max(80, scrollHeight + 40), 300);
      // Calculate width: base width + text width (min 200px, max 400px)
      const newWidth = Math.min(Math.max(200, scrollWidth + 20), 400);
      
      setNodeHeight(newHeight);
      setNodeWidth(newWidth);
    }
  }, [currText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  // Create input handles for each variable
  const inputHandles = variables.map((varName, index) => ({
    id: `${id}-${varName}`,
    name: varName,
    top: `${((index + 1) * 100) / (variables.length + 1)}%`
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      backgroundColor="#E8F5E9"
      borderColor="#4CAF50"
      titleColor="#2E7D32"
      width={nodeWidth}
      height={nodeHeight}
      inputHandles={inputHandles}
      outputHandles={[{ id: `${id}-output`, name: 'output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: '500' }}>Text:</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              padding: '6px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'none',
              minHeight: '40px',
              fontFamily: 'inherit',
              fontSize: '12px',
              width: '100%',
              boxSizing: 'border-box'
            }}
            placeholder="Enter text... Use {{ variableName }} for variables"
          />
        </label>
        {variables.length > 0 && (
          <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
