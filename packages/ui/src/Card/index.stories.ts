import type { Meta, StoryObj } from "@storybook/react";
import Card from ".";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  name: "Card template",
  args: {
    children: "Card example",
  },
};
