import React from 'react';
import { useAudioCapture } from '~hooks/useAudioCapture.tsx';
import { UseAudioCaptureProps } from '~hooks/useAudioCapture.types.ts';

export const AudioRecorder: React.FC<UseAudioCaptureProps> = (props) => {
  const { start, stop, pause, resume } = useAudioCapture(props);
  // onStart: () => {
  //   console.log('Recording started.');
  // },
  //   onStop: (_e, chunks) => {
  //   console.log('Recording stopped.');
  //   const blob = new Blob(chunks, { type: chunks[0].type });
  //   const file = new File([blob], 'sampleFile.webm', {
  //     type: chunks[0].type,
  //   });
  //   console.log(file);
  // },
  return (
    <div>
      <button onClick={start}>Start Recording</button>
      <button onClick={stop}>Stop Recording</button>
      <button onClick={pause}>Pause Recording</button>
      <button onClick={resume}>Resume Recording</button>
    </div>
  );
};
