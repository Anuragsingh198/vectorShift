// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';
import { SplitNode } from './nodes/splitNode';
import { ConditionNode } from './nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  filter: FilterNode,
  merge: MergeNode,
  split: SplitNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteNode: state.deleteNode,
  deleteEdge: state.deleteEdge,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      deleteNode,
      deleteEdge
    } = useStore(selector, shallow);

    // Handle Delete key press to remove selected nodes and edges
    useEffect(() => {
      const handleKeyDown = (event) => {
        // Don't trigger if user is typing in an input field
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
          return;
        }

        if (event.key === 'Delete' || event.key === 'Backspace') {
          const selectedNodes = nodes.filter(node => node.selected);
          const selectedEdges = edges.filter(edge => edge.selected);
          
          if (selectedNodes.length > 0 || selectedEdges.length > 0) {
            event.preventDefault();
            const nodeCount = selectedNodes.length;
            const edgeCount = selectedEdges.length;
            let message = '';
            
            if (nodeCount > 0 && edgeCount > 0) {
              message = `Delete ${nodeCount} node(s) and ${edgeCount} edge(s)?`;
            } else if (nodeCount > 0) {
              message = `Delete ${nodeCount} node(s)?`;
            } else {
              message = `Delete ${edgeCount} edge(s)?`;
            }
            
            if (window.confirm(message)) {
              selectedNodes.forEach(node => deleteNode(node.id));
              selectedEdges.forEach(edge => deleteEdge(edge.id));
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [nodes, edges, deleteNode, deleteEdge]);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            if (!reactFlowInstance) {
              return;
            }

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh', backgroundColor: '#fafafa'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                  style: { strokeWidth: 2, stroke: '#555' },
                  animated: true,
                  markerEnd: { type: 'arrowclosed' }
                }}
                deleteKeyCode="Delete"
                multiSelectionKeyCode="Shift"
            >
                <Background color="#e0e0e0" gap={gridSize} size={1} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
