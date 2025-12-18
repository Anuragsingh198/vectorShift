// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px', fontWeight: '600' }}>Node Palette</h3>
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='split' label='Split' />
                <DraggableNode type='condition' label='Condition' />
            </div>
        </div>
    );
};
