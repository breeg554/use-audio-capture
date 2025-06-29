# 🎙️ use-audio-capture

[![npm version](https://badge.fury.io/js/use-audio-capture.svg)](https://badge.fury.io/js/use-audio-capture)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A **lightweight**, **zero-dependency** React hook for **audio recording** using native **Web APIs** (MediaRecorder, getUserMedia). Perfect for building **voice notes**, **podcasts**, **interviews**, and **real-time audio processing** applications in React.

## 🚀 Why use-audio-capture?

**Stop struggling with complex audio libraries!** This React hook leverages native browser APIs to provide:

- 🎯 **Simple API** - Start recording with just one function call
- 🪶 **Lightweight** - Zero external dependencies, uses native Web APIs
- 🔧 **TypeScript Support** - Fully typed for excellent developer experience
- 🎛️ **Full Control** - Start, stop, pause, resume recordings programmatically
- 📊 **Real-time Data** - Access audio chunks as they're recorded
- 🚨 **Error Handling** - Built-in error management for robust applications
- 🌐 **Cross-browser** - Works in all modern browsers supporting MediaRecorder API

## 📦 Installation

```bash
npm install use-audio-capture
```

```bash
yarn add use-audio-capture
```

```bash
pnpm add use-audio-capture
```

## 🎯 Use Cases

Perfect for building:

- 🎙️ **Voice note applications**
- 🎧 **Podcast recording tools**
- 📞 **Interview and meeting recorders**
- 🎵 **Music practice apps**
- 🗣️ **Voice memos and dictation tools**
- 📱 **Audio chat applications**
- 🎬 **Content creation platforms**
- 🔊 **Audio feedback systems**
- 🎤 **Karaoke and singing apps**
- 📚 **Language learning tools with pronunciation**

## 🏁 Quick Start

### Basic Audio Recording

```tsx
import { useAudioCapture } from 'use-audio-capture';

export const VoiceRecorder = () => {
  const { start, stop, pause, resume } = useAudioCapture({
    onStart: () => console.log('🎙️ Recording started'),
    onChunk: (blobEvent) => console.log('Blob event here'),
    onStop: (event, chunks) => {
      // You can create audio file from recorded chunks on stop
      const blob = new Blob(chunks, { type: chunks[0].type });
      const file = new File([blob], 'sampleFile.webm', {
        type: chunks[0].type,
      });
      console.log(file);
    },
    onError: (_event, { error }) => {
      console.error('Recording error:', error);
    },
  });

  return (
    <div>
      <button onClick={start}>🎙️ Start Recording</button>
      <button onClick={stop}>⏹️ Stop</button>
      <button onClick={pause}>⏸️ Pause</button>
      <button onClick={resume}>▶️ Resume</button>
    </div>
  );
};
```

[📖 **See Live Example**](https://stackblitz.com/edit/stackblitz-starters-m44ars?file=src%2FApp.tsx) | [🎨 **Storybook Demo**](https://breeg554.github.io/use-audio-capture/?path=/story/example-audiorecorder--basic)

## More Advanced Example

Component example built based on **use-audio-capture** hook - [See live example](https://stackblitz.com/edit/da22123fggadad?file=src%2Fcomponents%2FAudioPrecorder%2FRecorder.tsx)

## 📚 API Reference

### Hook Usage

```tsx
const { start, stop, pause, resume } = useAudioCapture(options);
```

### Available Functions

| Function   | Description                                | Usage            |
| ---------- | ------------------------------------------ | ---------------- |
| `start()`  | Start audio recording                      | `await start()`  |
| `stop()`   | Stop recording and trigger onStop callback | `await stop()`   |
| `pause()`  | Pause current recording session            | `await pause()`  |
| `resume()` | Resume paused recording                    | `await resume()` |

### Callback Options

| Callback   | Triggered When           | Parameters                           |
| ---------- | ------------------------ | ------------------------------------ |
| `onStart`  | Recording begins         | `(event, { mediaStream })`           |
| `onChunk`  | New audio data available | `(blobEvent, { mediaStream })`       |
| `onStop`   | Recording stops          | `(event, chunks[], { mediaStream })` |
| `onPause`  | Recording paused         | `(event, chunks[], { mediaStream })` |
| `onResume` | Recording resumed        | `(event, chunks[], { mediaStream })` |
| `onError`  | Error occurs             | `(event, { mediaStream, error })`    |

## 🌐 Browser Support

This hook works in all modern browsers that support:

- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [getUserMedia API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

| Browser | Support |
| ------- | ------- |
| Chrome  | ✅ 47+  |
| Firefox | ✅ 29+  |
| Safari  | ✅ 14+  |
| Edge    | ✅ 79+  |

## 📄 License

MIT © [breeg554](https://github.com/breeg554)

---

**Keywords**: react hook, audio recording, web api, mediarecorder, getusermedia, voice notes, podcast, interview, real-time audio, browser recording, typescript, react audio, voice recorder, audio capture, microphone access
