import React, { useContext, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { AuthContext } from '../Provider/AuthProvider';
import moment from 'moment';
import useAxiosPublic from '../hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import TaskCard from './TaskCard';
import Swal from 'sweetalert2';

const TaskDashboard = () => {

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
                    toDoRefetch();
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

    return (
        <div>
            <div className='max-w-7xl mx-auto my-10 font-semibold p-4'>
                <div className='flex flex-wrap justify-between flex-col lg:flex-row gap-8'>

                    {/* Todo Column Dropable */}
                    <div className='rounded flex-1 p-6 bg-base-200'>
                        <div>
                            <h2 className='text-lg'>To-do List</h2>
                            <div className='my-4'>
                                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-primary btn-outline w-full"> <AiOutlineFileAdd className='text-lg'></AiOutlineFileAdd> Add New Task</button>
                            </div>

                            {/* To Task Card Dragable */}
                            <div className='space-y-4'>
                                {
                                    taskList.map((toDoTask, idx) => <TaskCard idx={idx} key={toDoTask?._id} toDoTask={toDoTask} ></TaskCard>)
                                }
                            </div>

                        </div>
                    </div>


                    {/* Todo List Dropable */}
                    <div className=' rounded flex-1 p-6 bg-base-200'>
                        <h2 className='text-lg'>In Progress</h2>
                        {/* Task Card */}
                        <div className='space-y-4 mt-4'>
                            {/* In Progress Task Card Draggable */}

                        </div>
                    </div>


                    {/* Todo List Dropable */}
                    <div className='rounded flex-1 p-6 bg-base-200'>
                        <h2 className='text-lg'>Done</h2>
                        {/* Task Card */}
                        <div className='space-y-4 mt-4'>
                            {/* Done Task Card Dragable */}


                        </div>
                    </div>

                </div>

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

            </div >
        </div >
    );
};

export default TaskDashboard;