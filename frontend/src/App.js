import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '16px 18px',
        gap: '12px',
        boxSizing: 'border-box',
      }}
    >
      <PipelineToolbar />
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          borderRadius: '24px',
          position: 'relative',
        }}
      >
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
