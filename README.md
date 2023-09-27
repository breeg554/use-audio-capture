# use-audio-recorder
A React hook for audio recording using the Web APIs. 
It provides functionality for starting, stopping, pausing, and resuming recordings, with customizable callback events.

## Features

- 🧠 **Intuitive API:** Seamlessly integrates with React components for a smooth developer experience.
- 🎣 **Customizable Callbacks:** Easily react to various recording events such as starting, stopping, pausing, and data chunk availability.
- 🚫 **Error Handling:** Built-in error events to handle and manage recording issues.
- ⏸️ **Pause and Resume:** Not just start and stop! Pause your recordings and resume right where you left off.
- 🎙️ **Data Chunk Access:** Access raw audio data chunks as the recording progresses, allowing for advanced use-cases.
- 🕊️ **No External Dependencies:** Built with native Web APIs, ensuring a lightweight package with no extra dependencies.

## Installation

```bash
npm install use-audio-recorder
```

## Getting Started

#### Basic usage

```tsx
import { useAudioRecorder } from 'use-audio-recorder';

export const AudioRecorder: React.FC<AudioRecorderProps> = () => {
  const { start, stop, pause, resume } = useAudioRecorder({
    onStart: () => {
      console.log('Recording started.');
    },
    onStop: (_e, chunks) => {
      const blob = new Blob(chunks, { type: chunks[0].type });
      const file = new File([blob], 'sampleFile.webm', {
        type: chunks[0].type,
      });
      console.log(file);
    },
  });

  return (
    <div>
      <button onClick={start}>Start Recording</button>
      <button onClick={stop}>Stop Recording</button>
      <button onClick={pause}>Pause Recording</button>
      <button onClick={resume}>Resume Recording</button>
    </div>
  );
};
```

## Available Callbacks and Their Properties


| Callback       | Description                                     | Properties Received                                      |
|----------------|-------------------------------------------------|---------------------------------------------------------|
| `onStart`      | Called when recording starts.                   | `event`, `{ mediaStream, mediaRecorder }`     |
| `onChunk`      | Called when a data chunk is available.          | `blobEvent`, `{ mediaStream, mediaRecorder }`           |
| `onStop`       | Called when recording stops.                    | `event`, `chunks`, `{ mediaStream, mediaRecorder }`     |
| `onPause`      | Called when recording is paused.                | `event`, `chunks`, `{ mediaStream, mediaRecorder }`     |
| `onResume`     | Called when recording is resumed after pausing. | `event`, `chunks`, `{ mediaStream, mediaRecorder }`     |
| `onError`      | Called when an error occurs during recording.  | `event`, `{ mediaStream, mediaRecorder, error }`        |


## License
MIT