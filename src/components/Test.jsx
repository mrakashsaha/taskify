import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableTask } from "./DraggableTask";
import { DroppableColumn } from "./DroppableColumn";

const initialTasks = [
  { id: "1", title: "Learn React", status: "todo" },
  { id: "2", title: "Build a project", status: "inProgress" },
  { id: "3", title: "Deploy app", status: "done" },
];

const columns = ["todo", "inProgress", "done"];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === active.id ? { ...task, status: over.id } : task
      )
    );
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4">
        {columns.map((col) => (
          <DroppableColumn key={col} id={col} title={col}>
            <SortableContext items={tasks.filter((task) => task.status === col)} strategy={verticalListSortingStrategy}>
              {tasks.filter((task) => task.status === col).map((task) => (
                <DraggableTask key={task.id} task={task} />
              ))}
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}
