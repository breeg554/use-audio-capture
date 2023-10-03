import { UseAudioCaptureProps } from './useAudioCapture.types.ts';
export declare const useAudioCapture: (props?: UseAudioCaptureProps) => {
    start: () => Promise<void>;
    stop: () => Promise<void>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
};
