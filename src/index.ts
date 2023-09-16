import { useAudioRecorder } from '~hooks/useAudioRecorder.tsx';
import type {
  UseAudioRecorderProps,
  UseAudioRecorderChunkCb,
  UseAudioRecorderErrorCb,
  UseAudioRecorderCb,
  UseAudioRecorderErrorCbOptions,
  UseAudioRecorderCbOptions,
} from '~hooks/useAudioRecorder.tsx';

import { useAudioVisualize } from '~hooks/useAudioVisualize.tsx';
import type { UseAudioVisualizeArgs } from '~hooks/useAudioVisualize.tsx';

import { AudioRecorder } from '~components/AudioRecorder.tsx';
import type { AudioRecorderProps } from '~components/AudioRecorder.tsx';

export { useAudioRecorder, useAudioVisualize, AudioRecorder };

export type {
  UseAudioRecorderProps,
  UseAudioRecorderChunkCb,
  UseAudioRecorderErrorCb,
  UseAudioRecorderCb,
  UseAudioRecorderErrorCbOptions,
  UseAudioRecorderCbOptions,
  UseAudioVisualizeArgs,
  AudioRecorderProps,
};
