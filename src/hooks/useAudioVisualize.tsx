import { RefObject, useCallback, useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';
import { assert } from '~utils/assert';

export interface UseAudioVisualizeArgs {
  barHeightFactor: number;
  barWidth: number;
  barPositionFactor: number;
  fftSize: number;
  onError?: (err: unknown) => void;
}

const BASE_OPTIONS: UseAudioVisualizeArgs = {
  barWidth: 3,
  barHeightFactor: 1,
  barPositionFactor: 4,
  fftSize: 1024,
};

export const useAudioVisualize = (
  canvas: RefObject<HTMLCanvasElement>,
  args?: Partial<UseAudioVisualizeArgs>,
) => {
  const { barHeightFactor, barPositionFactor, fftSize, onError, ...rest } = {
    ...BASE_OPTIONS,
    ...args,
  };

  const animationFrameRef = useRef<number | null>(null);
  const audioAnalyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<
    MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null
  >(null);
  const audioSourceOriginal = useRef<HTMLAudioElement | MediaStream | null>(
    null,
  );

  const handleClearFrame = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const drawAudio = useCallback(() => {
    const canvasContext = canvas.current?.getContext('2d');
    assert(canvasContext, 'Failed to get canvas context');

    function draw() {
      assert(audioAnalyzerRef.current);
      assert(canvas.current);
      assert(canvasContext);

      const frequencyBinCountArray = new Uint8Array(
        audioAnalyzerRef.current.fftSize / 2,
      );

      const barCount = canvas.current.width / 2;

      audioAnalyzerRef.current.getByteFrequencyData(frequencyBinCountArray);

      canvasContext.clearRect(
        0,
        0,
        canvas.current.width,
        canvas.current.height,
      );
      const centerY = canvas.current.height / 2;

      canvasContext.fillStyle = 'orange';

      for (let i = 0; i < barCount; i++) {
        const barPosition = i * barPositionFactor;
        const barWidth = rest.barWidth;
        const barHeight = (frequencyBinCountArray[i] / 6) * barHeightFactor;

        canvasContext.fillRect(
          barPosition,
          centerY - barHeight / 2,
          barWidth,
          barHeight / 2,
        );
        canvasContext.fillRect(barPosition, centerY, barWidth, barHeight / 2);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    }
    draw();
  }, [barHeightFactor, barPositionFactor, canvas, rest.barWidth]);

  const disconnectSources = useCallback(async () => {
    handleClearFrame();

    audioSourceRef.current?.disconnect();
    audioSourceRef.current = null;

    await audioContextRef.current?.close();
    audioContextRef.current = null;

    audioAnalyzerRef.current?.disconnect();
    audioAnalyzerRef.current = null;
  }, [handleClearFrame]);

  const createMediaAnalyzer = useCallback(
    (source: HTMLAudioElement | MediaStream) => {
      assert(
        window.AudioContext,
        'Web Audio API is not supported in this browser',
      );

      audioContextRef.current = new window.AudioContext();
      audioAnalyzerRef.current = audioContextRef.current.createAnalyser();
      audioAnalyzerRef.current.fftSize = fftSize;

      if (isSourceNode(source)) {
        audioSourceRef.current =
          audioContextRef.current.createMediaStreamSource(source);
      } else {
        audioSourceRef.current =
          audioContextRef.current.createMediaElementSource(source);
        audioAnalyzerRef.current.connect(audioContextRef.current.destination);
      }

      audioSourceRef.current.connect(audioAnalyzerRef.current);
    },
    [fftSize],
  );
  const visualizeAudio = useCallback(
    async (source: HTMLAudioElement | MediaStream) => {
      if (typeof window === 'undefined') return;
      try {
        if (!isEqual(source, audioSourceOriginal.current)) {
          await disconnectSources();
          createMediaAnalyzer(source);
        }

        audioSourceOriginal.current = source;

        drawAudio();
      } catch (err) {
        console.error(err);
        onError?.(err);
      }
    },
    [drawAudio, disconnectSources, createMediaAnalyzer, onError],
  );

  useEffect(() => {
    return () => {
      handleClearFrame();
    };
  }, [handleClearFrame]);

  return {
    visualizeAudio,
    stopVisualization: handleClearFrame,
    disconnectSources,
  };
};

function isSourceNode(
  source: HTMLAudioElement | MediaStream,
): source is MediaStream {
  return (source as MediaStream).getTracks !== undefined;
}