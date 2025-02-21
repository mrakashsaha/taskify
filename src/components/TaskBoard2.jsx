import React, { useContext, useState } from "react";
import {
  DndContext,
  closestCorners,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useAxiosPublic from "../hook/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const initialTasks = {
  todo: [{ id: "1", title: "Task 1" }, { id: "2", title: "Task 2" }],
  inProgress: [{ id: "3", title: "Task 3" }],
  done: [{ id: "4", title: "Task 4" }],
};

const TaskBoard2 = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  
  const { data: taskList = [], refetch, isPending } = useQuery({
    queryKey: ["taskList", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/task?email=${user?.email}`);
      return res.data;
    }
  })

  const [tasksByCategory, setTasksbyCategory] = useState({
    toDo: taskList.filter(task => task.category === "toDo"),
    inProgress: taskList.filter(task => task.category === "inProgress"),
    done: taskList.filter(task => task.category === "done")
  });

  console.log(tasksByCategory)










  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = over.id; // Use column ID instead of item ID

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    const activeTask = tasks[activeContainer].find((task) => task.id === active.id);

    setTasks((prev) => ({
      ...prev,
      [activeContainer]: prev[activeContainer].filter((task) => task.id !== active.id),
      [overContainer]: [...prev[overContainer], activeTask],
    }));
  };

  const findContainer = (id) => {
    return Object.keys(tasks).find((key) => tasks[key].some((task) => task.id === id));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4">
        {Object.keys(tasks).map((status) => (
          <TaskColumn key={status} id={status} title={status} tasks={tasks[status]} />
        ))}
      </div>
    </DndContext>
  );
};

const TaskColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="w-1/3 bg-gray-100 p-4 rounded-lg shadow my-20 min-h-[200px]">
      <h2 className="text-xl font-bold mb-2">{title.toUpperCase()}</h2>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white p-3 mb-2 shadow rounded cursor-grab"
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
      }}
    >
      {task.title}
    </div>
  );
};

export default TaskBoard2;