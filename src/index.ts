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

export { useAudioRecorder, useAudioVisualize };

export type {
  UseAudioRecorderProps,
  UseAudioRecorderChunkCb,
  UseAudioRecorderErrorCb,
  UseAudioRecorderCb,
  UseAudioRecorderErrorCbOptions,
  UseAudioRecorderCbOptions,
  UseAudioVisualizeArgs,
};
