import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import SortableCard from "../SortableCard";
import { Dispatch, SetStateAction, useState } from "react";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

interface Props {
  cards: { id: string; content: string }[];
  setCards: Dispatch<SetStateAction<{ id: string; content: string }[]>>;
}

const CardStack = ({ cards, setCards }: Props) => {
  const [activeId, setActiveId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active?.id) {
      setActiveId(active.id as string);
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(prev, oldIndex, newIndex);
        }
        return prev;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setCards((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(prev, oldIndex, newIndex);
        }
        return prev;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <SortableContext items={cards} strategy={horizontalListSortingStrategy}>
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="relative w-fit h-[300px] pb-[50px] flex flex-col"
            style={{ perspective: "10000px" }}
          >
            {cards.map(({ id, content }, index) => (
              <SortableCard
                id={id}
                key={id}
                index={index}
                isActiveCard={id === activeId}
                zLayer={cards.length - index}
              >
                {content}
              </SortableCard>
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default CardStack;
