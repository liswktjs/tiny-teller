import type { Meta, StoryObj } from "@storybook/react";

import CardStack from ".";
import { useState } from "react";

const meta: Meta<typeof CardStack> = {
  title: "CardStack",
  component: CardStack,
};

export default meta;

type Story = StoryObj<typeof CardStack>;

export const Primary: Story = {
  name: "Sortable Card Stack",
  render: () => {
    const [cards, setCards] = useState([
      { id: "card-1", content: "card 1" },
      { id: "card-2", content: "card 2" },
      { id: "card-3", content: "card 3" },
      { id: "card-4", content: "card 4" },
      { id: "card-5", content: "card 5" },
      { id: "card-6", content: "card 6" },
      { id: "card-7", content: "card 7" },
      { id: "card-8", content: "card 8" },
      { id: "card-9", content: "card 9" },
      { id: "card-10", content: "card 10" },
    ]);
    return <CardStack cards={cards} setCards={setCards} />;
  },
};
