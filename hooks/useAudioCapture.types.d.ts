export interface UseAudioCaptureCbOptions {
    mediaStream: MediaStream | null;
}
export interface UseAudioCaptureErrorCbOptions extends UseAudioCaptureCbOptions {
    error?: unknown;
}
export type UseAudioCaptureCb = (e: Event, chunks: Blob[], args: UseAudioCaptureCbOptions) => void;
export type UseAudioCaptureStartCb = (e: Event, args: UseAudioCaptureErrorCbOptions) => void;
export type UseAudioCaptureErrorCb = (e: Event, args: UseAudioCaptureErrorCbOptions) => void;
export type UseAudioCaptureChunkCb = (e: BlobEvent, args: UseAudioCaptureCbOptions) => void;
export interface UseAudioCaptureProps {
    onChunk?: UseAudioCaptureChunkCb;
    onError?: UseAudioCaptureErrorCb;
    onStart?: UseAudioCaptureStartCb;
    onStop?: UseAudioCaptureCb;
    onPause?: UseAudioCaptureCb;
    onResume?: UseAudioCaptureCb;
}
