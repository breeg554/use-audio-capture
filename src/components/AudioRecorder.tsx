import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAudioVisualize } from '~hooks/useAudioVisualize';
import {
  useAudioRecorder,
  UseAudioRecorderCb,
  UseAudioRecorderProps,
} from '~hooks/useAudioRecorder';
import { MicrophoneIcon } from '~icons/MicrophoneIcon.tsx';
import { PlayIcon } from '~icons/PlayIcon.tsx';
import { PauseIcon } from '~icons/PauseIcon.tsx';
import { TrashIcon } from '~icons/TrashIcon.tsx';

export type MediaRecorderState =
  | 'inactive'
  | 'recording'
  | 'paused'
  | 'playing';
export interface AudioRecorderProps extends UseAudioRecorderProps {
  audioUrl?: string;
  onClear?: () => void;
  onStatusChange?: (status: MediaRecorderState) => void;
  audioOptions?: BlobPropertyBag;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onStart,
  onPause,
  onChunk,
  onStop,
  onClear,
  onError,
  onResume,
  onStatusChange,
  audioOptions,
  audioUrl: audioFromProps,
}) => {
  const [status, setStatus] = useState<MediaRecorderState>('inactive');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  const isControlled = typeof audioFromProps !== 'undefined';

  const audioValue = useMemo(() => {
    return isControlled ? audioFromProps : audioUrl;
  }, [audioFromProps, audioUrl, isControlled]);

  const { visualizeAudio, stopVisualization, disconnectSources } =
    useAudioVisualize(canvasRef);

  const handleOnStop: UseAudioRecorderCb = useCallback(
    (e, chunks, args) => {
      onStop?.(e, chunks, args);

      if (!isControlled) {
        const blob = new Blob(chunks, { type: 'audio/mp3;', ...audioOptions });
        setAudioUrl(URL.createObjectURL(blob));
      }

      stopVisualization();
      setStatus('paused');
    },
    [isControlled, stopVisualization, onStop],
  );

  const handleClear = useCallback(async () => {
    onClear?.();
    setStatus('inactive');
    setAudioUrl(undefined);

    await disconnectSources();
    stopVisualization();
  }, [disconnectSources, stopVisualization, onClear]);

  const handleOnStart: UseAudioRecorderCb = useCallback(
    async (e, chunks, args) => {
      onStart?.(e, chunks, args);

      await handleClear();
      if (!args.mediaStream) return;

      await visualizeAudio(args.mediaStream);
      setStatus('recording');
    },
    [handleClear, visualizeAudio, onStart],
  );

  const { stop, start } = useAudioRecorder({
    onStop: handleOnStop,
    onStart: handleOnStart,
    onChunk,
    onPause,
    onError,
    onResume,
  });

  const ButtonIcon = useCallback(() => {
    if (audioValue && status === 'playing') return <PauseIcon />;
    if (audioValue && status === 'paused') return <PlayIcon />;

    return <MicrophoneIcon />;
  }, [audioValue, status]);

  const playAudio = useCallback(async () => {
    if (!canvasRef.current || !audioRef.current) return;
    await visualizeAudio(audioRef.current);
    audioRef.current.play();
    setStatus('playing');
  }, [visualizeAudio]);

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    stopVisualization();
    setStatus('paused');
  }, [stopVisualization]);

  const handlePlay = useCallback(async () => {
    if (status === 'playing' || !audioValue) {
      pauseAudio();
    } else {
      await playAudio();
    }
  }, [pauseAudio, playAudio, status, audioValue]);

  const handleRecord = useCallback(async () => {
    if (status === 'recording') {
      await stop();
    } else {
      await start();
    }
  }, [status, start, stop]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status]);

  return (
    <div>
      <audio
        key={audioValue}
        src={audioValue}
        ref={audioRef}
        onEnded={pauseAudio}
        controls
        hidden
      />

      <button onClick={audioValue ? handlePlay : handleRecord}>
        <ButtonIcon />
      </button>

      <div>
        <canvas ref={canvasRef} width={audioUrl ? 178 : 210} height={36} />
      </div>

      {audioValue && (
        <button onClick={handleClear}>
          <TrashIcon />
        </button>
      )}
    </div>
  );
};
