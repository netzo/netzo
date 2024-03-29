// adapted from https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/blob/main/src/components/multipleContainersKeyboardPreset.ts
import {
  closestCorners,
  DroppableContainer,
  getFirstCollision,
  KeyboardCode,
  KeyboardCoordinateGetter,
} from "../../../deps/@dnd-kit/core.ts";

const directions: string[] = [
  KeyboardCode.Down,
  KeyboardCode.Right,
  KeyboardCode.Up,
  KeyboardCode.Left,
];

export const coordinateGetter: KeyboardCoordinateGetter = (
  event,
  { context: { active, droppableRects, droppableContainers, collisionRect } },
) => {
  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) return;

    const filteredContainers: DroppableContainer[] = [];

    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry?.disabled) return;

      const rect = droppableRects.get(entry.id);

      if (!rect) return;

      const data = entry.data.current;

      if (data) {
        const { type, children } = data;

        if (type === "Group" && children?.length > 0) {
          if (active.data.current?.type !== "Group") return;
        }
      }

      switch (event.code) {
        case KeyboardCode.Down:
          if (active.data.current?.type === "Group") return;

          if (collisionRect.top < rect.top) {
            // find all droppable areas below
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (active.data.current?.type === "Group") {
            return;
          }
          if (collisionRect.top > rect.top) {
            // find all droppable areas above
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left >= rect.left + rect.width) {
            // find all droppable areas to left
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          // find all droppable areas to right
          if (collisionRect.left + collisionRect.width <= rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });
    const collisions = closestCorners({
      active,
      collisionRect: collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null,
    });
    const closestId = getFirstCollision(collisions, "id");

    if (closestId != null) {
      const newDroppable = droppableContainers.get(closestId);
      const newNode = newDroppable?.node.current;
      const newRect = newDroppable?.rect.current;

      if (newNode && newRect) {
        return {
          x: newRect.left,
          y: newRect.top,
        };
      }
    }
  }

  return undefined;
};
