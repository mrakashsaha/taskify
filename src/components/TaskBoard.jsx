import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import TaskCard from "./TaskCard";
import Swal from "sweetalert2";
import { MdOutlineAddTask } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";

const TaskBoard = () => {

  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [modalData, setModalData] = useState({});

  const { data: initialTasks = [], refetch, isPending } = useQuery({
    queryKey: ["taskList", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/task?email=${user?.email}`);
      return res.data;
    },
  });

  // Function to group tasks into columns
  const groupTasksByCategory = (tasks) => ({
    toDo: tasks.filter((task) => task.category === "toDo"),
    inProgress: tasks.filter((task) => task.category === "inProgress"),
    done: tasks.filter((task) => task.category === "done"),
  });

  // State for grouped tasks
  const [tasks, setTasks] = useState(groupTasksByCategory(initialTasks));

  // Update tasks when data is fetched
  useEffect(() => {
    setTasks(groupTasksByCategory(initialTasks));
  }, [initialTasks]);


  const updateTaskCategory = (updateInfo) => {

    console.log(updateInfo);

    axiosPublic.patch("/task", updateInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
        }
      })

  }

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const sourceTasks = [...tasks[sourceColumn]];
    const destTasks = [...tasks[destColumn]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    movedTask.category = destColumn; // Update category locally

    if (sourceColumn === destColumn) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks({ ...tasks, [sourceColumn]: sourceTasks });
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setTasks({ ...tasks, [sourceColumn]: sourceTasks, [destColumn]: destTasks });

      // Send update request to backend
      updateTaskCategory({ taskId: movedTask._id, newCategory: destColumn });
    }
  };


  const handleAddTask = (e) => {
    e.preventDefault();
    const taskTitle = e.target.title.value;
    const taskDescription = e.target.description.value;
    const createdBy = user?.email;
    const date = moment().toISOString();
    const category = "toDo"

    const taskData = { taskTitle, taskDescription, createdBy, date, category };

    axiosPublic.post("/task", taskData)
      .then(res => {
        if (res?.data?.insertedId) {
          e.target.reset();
          document.getElementById('my_modal_5').close();
          refetch();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Task added sucessfully!"
          });

        }
      })
      .catch(error => console.log(error));



  }


  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/deleteTask?taskId=${taskId}`)
          .then(res => {
            if (res?.data?.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

              refetch();
            }
          })
          .catch(error => console.log(error));
      }
    });


  }

  const handleEditTask = (taskId) => {


    axiosPublic.get(`/taskById?taskId=${taskId}`)
      .then(res => {
        setModalData(res.data);
      })
      .catch(error => console.log(error));



    document.getElementById('updateTask').showModal();

  }

  const handleEditTaskData = (e, _id) => {
    e.preventDefault();
    const taskId = _id;
    const taskTitle = e.target.title.value;
    const taskDescription = e.target.description.value;
    const category = e.target.category.value;

    const updateTaskInfo = {
      taskId, taskTitle, taskDescription, category
    }

    console.log(updateTaskInfo);

    axiosPublic.patch("/updateTask", updateTaskInfo)
      .then(res => {
        console.log (res.data)
        if (res?.data?.modifiedCount>0) {
          document.getElementById('updateTask').close();
          refetch();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Task Updated sucessfully!"
          });
        }

        else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "info",
            title: "Nothing to Update!"
          });
        }

      })
      .catch(error => console.log(error))
  }



  return (
    <div className="max-w-7xl mx-auto my-10 font-semibold p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap justify-between flex-col lg:flex-row gap-8">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="rounded  min-h-[calc(100vh-200px)] flex-1 p-6 bg-base-200">
                  <div className="p-2 my-2">
                    <h2 className="text-lg text-center uppercase">{columnId === "toDo" ? "To-Do List" : columnId === "inProgress" ? "In Progress" : "Done"}</h2>
                  </div>
                  {columnTasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 my-2"
                        >
                          {/* <h3 className="font-semibold">{task.taskTitle}</h3>
                        <p className="text-sm">{task.taskDescription}</p> */}

                          <TaskCard handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} idx={index} key={task?._id} task={task} ></TaskCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-primary btn-circle btn-lg fixed bottom-8 right-8 md:right-14 rounded-full shadow-lg"> <IoIosAdd className="text-3xl"></IoIosAdd>
      </button>

      {/* Modal for Add New Task */}
      <dialog id="my_modal_5" className="modal modal-middle p-4">
        <div className="card-body rounded-md min-w-xs md:min-w-md bg-base-100">
          <div>
            <form onSubmit={handleAddTask} className='fieldset'>
              <label className="fieldset-label">Title</label>
              <input required name='title' maxLength={50} type="text" className="w-full input" placeholder="Enter Task Name" />
              <label className="fieldset-label">Description</label>
              <textarea maxLength={200} required name='description' type="textarea" className="w-full textarea" placeholder="Enter Task Description" />
              <button className="w-full btn btn-primary shadow-none mt-4">Add Task</button>
            </form>
          </div>

          <div className="">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn w-full">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>



      {/* Modal for Update Task */}
      <dialog id="updateTask" className="modal modal-middle p-4">
        <div className="card-body rounded-md min-w-xs md:min-w-md bg-base-100">
          <div>
            <form onSubmit={(e) => handleEditTaskData(e, modalData?._id)} className='fieldset'>
              <h3 className='text-center text-xl'>Update Task Information</h3>
              <label className="fieldset-label">Title</label>
              <input defaultValue={modalData?.taskTitle} required name='title' maxLength={50} type="text" className="w-full input" placeholder="Enter Task Name" />
              <label className="fieldset-label">Category</label>
              <select name="category" className="select w-full" defaultValue={modalData?.category} key={modalData?.category}>
                <option value="toDo">To-Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <label className="fieldset-label">Description</label>
              <textarea defaultValue={modalData?.taskDescription} maxLength={200} required name='description' type="textarea" className="w-full textarea" placeholder="Enter Task Description" />
              <button className="w-full btn btn-primary shadow-none mt-4">Update Task</button>
            </form>
          </div>

          <div className="">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn w-full">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TaskBoard;
