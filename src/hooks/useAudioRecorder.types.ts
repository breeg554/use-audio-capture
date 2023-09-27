export interface UseAudioRecorderCbOptions {
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
}

export interface UseAudioRecorderErrorCbOptions
  extends UseAudioRecorderCbOptions {
  error?: unknown;
}

export type UseAudioRecorderCb = (
  e: Event,
  chunks: Blob[],
  args: UseAudioRecorderCbOptions,
) => void;

export type UseAudioRecorderStartCb = (
  e: Event,
  args: UseAudioRecorderErrorCbOptions,
) => void;

export type UseAudioRecorderErrorCb = (
  e: Event,
  args: UseAudioRecorderErrorCbOptions,
) => void;

export type UseAudioRecorderChunkCb = (
  e: BlobEvent,
  args: UseAudioRecorderCbOptions,
) => void;
export interface UseAudioRecorderProps {
  onChunk?: UseAudioRecorderChunkCb;
  onError?: UseAudioRecorderErrorCb;
  onStart?: UseAudioRecorderStartCb;
  onStop?: UseAudioRecorderCb;
  onPause?: UseAudioRecorderCb;
  onResume?: UseAudioRecorderCb;
}
