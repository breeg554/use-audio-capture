import React from 'react';
import ReactDOM from 'react-dom/client';
import { AudioRecorder } from '~components/AudioRecorder.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioRecorder />
  </React.StrictMode>,
);
