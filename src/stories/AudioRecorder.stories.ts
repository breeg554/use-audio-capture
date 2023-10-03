import type { Meta, StoryObj } from '@storybook/react';
import { AudioRecorder } from './AudioRecorder.tsx';

const meta = {
  title: 'Example/AudioRecorder',
  component: AudioRecorder,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AudioRecorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
