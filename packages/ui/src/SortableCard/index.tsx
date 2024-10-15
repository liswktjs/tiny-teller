import { PropsWithChildren } from "react";
import cn from "classnames";
import Card from "../Card";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  id: string;
  index: number;
  zLayer: number;
  isActiveCard: boolean;
}

const SortableCard = ({
  id,
  children,
  zLayer,
  index,
  isActiveCard,
}: PropsWithChildren<Props>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `${CSS.Transform.toString(transform)} translate3d(0, calc(${index} * 1px),0) scale(1.1) rotateX(60deg) rotateZ(60deg) `
      : `translate3d(0, calc(${index} * 1px),0) scale(1.1) rotateX(60deg) rotateZ(60deg)`,
    transition,
    zIndex: isDragging ? 9999 : zLayer,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div className="relative h-[50px]">
      <Card
        className={cn(
          "absolute border-[0.25px] border-black w-40 h-72 grow-0 shrink-0 flex",
          {
            "opacity-70": isDragging,
            "outline-blue-400 outline outline-1": isActiveCard,
          },
        )}
        ref={setNodeRef}
        id={id}
        style={{
          ...style,
          transformStyle: "preserve-3d",
        }}
        {...listeners}
        {...attributes}
      >
        {children}
      </Card>
    </div>
  );
};

export default SortableCard;
