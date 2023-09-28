# use-audio-capture
A React hook for audio recording using the Web APIs. 
It provides functionality for starting, stopping, pausing, and resuming recordings, with customizable callback events.

## Features

- 🧠 **Intuitive API**
- 🎣 **Customizable Callbacks:** Easily react to various recording events such as starting, stopping, pausing, and data chunk availability.
- 🚫 **Error Handling:** Built-in error events to handle and manage recording issues.
- ⏸️ **Pause and Resume:** Not just start and stop! Pause your recordings and resume right where you left off.
- 🎙️ **Data Chunk Access:** Access raw audio data chunks as the recording progresses, allowing for advanced use-cases.
- 🕊️ **No External Dependencies:** Built with native Web APIs, ensuring a lightweight package with no extra dependencies.

## Installation

```bash
npm install use-audio-capture
```

## Getting Started

#### Basic usage

```tsx
import { useAudioCapture } from 'use-audio-capture';

export const AudioRecorder: React.FC<AudioRecorderProps> = () => {
  const { start, stop, pause, resume } = useAudioCapture({
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

## Functions returned by `useAudioCapture`

| Function Name | Description                                       | Parameters                     | Returns       |
|---------------|---------------------------------------------------|--------------------------------|---------------|
| `start`       | Starts the audio recording.                       | None                           | `void`        |
| `stop`        | Stops the audio recording.                        | None                           | `void`        |
| `pause`       | Pauses the current recording session.             | None                           | `void`        |
| `resume`      | Resumes a paused recording session.               | None                           | `void`        |


## Available Callbacks and Their Properties


| Callback       | Description                                     | Properties Received                          |
|----------------|-------------------------------------------------|---------------------------------------------|
| `onStart`      | Called when recording starts.                   | `event`, `{ mediaStream }`     |
| `onChunk`      | Called when a data chunk is available.          | `blobEvent`, `{ mediaStream }`     |
| `onStop`       | Called when recording stops.                    | `event`, `chunks`, `{ mediaStream }` |
| `onPause`      | Called when recording is paused.                | `event`, `chunks`, `{ mediaStream }` |
| `onResume`     | Called when recording is resumed after pausing. | `event`, `chunks`, `{ mediaStream }` |
| `onError`      | Called when an error occurs during recording.  | `event`, `{ mediaStream, error }` |


## License
MIT