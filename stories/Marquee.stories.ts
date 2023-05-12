import type { Meta, StoryObj } from '@storybook/react';

import Marquee from '../lib/index';

const meta: Meta<typeof Marquee> = {
  title: 'Marquee',
  component: Marquee,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Marquee>;

export const Default: Story = {
  args: {
    direction: 'right-left',
    speed: 15,
    style: {
      whiteSpace: 'nowrap'
    },
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
};
