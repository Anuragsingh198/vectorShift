// pipelineRuntime.js
// Simple, synchronous evaluator for the demo pipeline.
// It lets Input -> Text -> Transform -> Output pass real string values.

// Extract unique variable names from a text like: "Hello {{ input }} and {{user_name}}".
const extractVariables = (text) => {
  if (!text) return [];
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const vars = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    const name = match[1].trim();
    if (name) vars.add(name);
  }

  return Array.from(vars);
};

const replaceVariables = (text, valuesByName) => {
  if (!text) return '';
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  return text.replace(regex, (match, name) => {
    const key = name.trim();
    const value = valuesByName[key];
    return typeof value === 'string' && value.length > 0 ? value : match;
  });
};

const findNodeById = (nodes, id) => nodes.find((n) => n.id === id);

const getIncomingEdgeForHandle = (nodeId, handleId, edges) => {
  return edges.find((edge) => edge.target === nodeId && edge.targetHandle === handleId);
};

const getSingleInputValue = (targetNodeId, targetHandleId, nodes, edges, cache, visiting) => {
  const edge = getIncomingEdgeForHandle(targetNodeId, targetHandleId, edges);
  if (!edge) return '';
  return evaluateNodeValue(edge.source, nodes, edges, cache, visiting);
};

const evaluateTextNode = (node, nodes, edges, cache, visiting) => {
  const rawText = (node.data && typeof node.data.text === 'string') ? node.data.text : '';
  const variables = extractVariables(rawText);
  if (variables.length === 0) return rawText;

  const values = {};
  variables.forEach((name) => {
    const handleId = `${node.id}-${name}`;
    values[name] = getSingleInputValue(node.id, handleId, nodes, edges, cache, visiting);
  });

  return replaceVariables(rawText, values);
};

const evaluateTransformNode = (node, nodes, edges, cache, visiting) => {
  const inputHandleId = `${node.id}-input`;
  const inputValue = getSingleInputValue(node.id, inputHandleId, nodes, edges, cache, visiting) || '';
  const mode = node.data?.transformType || 'uppercase';

  switch (mode) {
    case 'lowercase':
      return inputValue.toLowerCase();
    case 'reverse':
      return inputValue.split('').reverse().join('');
    case 'trim':
      return inputValue.trim();
    case 'uppercase':
    default:
      return inputValue.toUpperCase();
  }
};

const evaluateOutputNode = (node, nodes, edges, cache, visiting) => {
  const inputHandleId = `${node.id}-value`;
  return getSingleInputValue(node.id, inputHandleId, nodes, edges, cache, visiting) || '';
};

// Main exported function. Safe for DAGs; for cycles it just returns empty string.
export function evaluateNodeValue(nodeId, nodes, edges, cache = {}, visiting = new Set()) {
  if (!nodeId) return '';
  if (!Array.isArray(nodes) || !Array.isArray(edges)) return '';

  if (cache[nodeId] !== undefined) {
    return cache[nodeId];
  }

  if (visiting.has(nodeId)) {
    // Cycle detected; bail out to avoid infinite recursion.
    return '';
  }

  const node = findNodeById(nodes, nodeId);
  if (!node) return '';

  visiting.add(nodeId);

  let result = '';

  switch (node.type) {
    case 'customInput': {
      result = (node.data && typeof node.data.value === 'string') ? node.data.value : '';
      break;
    }
    case 'text': {
      result = evaluateTextNode(node, nodes, edges, cache, visiting);
      break;
    }
    case 'transform': {
      result = evaluateTransformNode(node, nodes, edges, cache, visiting);
      break;
    }
    case 'customOutput': {
      result = evaluateOutputNode(node, nodes, edges, cache, visiting);
      break;
    }
    case 'llm': {
      // Simple placeholder to show something flows through.
      const promptHandleId = `${node.id}-prompt`;
      const systemHandleId = `${node.id}-system`;
      const prompt = getSingleInputValue(node.id, promptHandleId, nodes, edges, cache, visiting) || '';
      const system = getSingleInputValue(node.id, systemHandleId, nodes, edges, cache, visiting) || '';
      result = `[LLM output based on system: "${system}" and prompt: "${prompt}"]`;
      break;
    }
    default: {
      // For other nodes (filter, merge, split, condition, etc.),
      // just try to read from the first incoming edge and pass that value through.
      const anyIncoming = edges.find((e) => e.target === node.id);
      if (anyIncoming) {
        result = evaluateNodeValue(anyIncoming.source, nodes, edges, cache, visiting);
      } else {
        result = '';
      }
    }
  }

  visiting.delete(nodeId);
  cache[nodeId] = result;
  return result;
}
