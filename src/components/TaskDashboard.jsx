import React, { useContext } from 'react';
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

    const { data: toDoTasksList = [], refetch: toDoRefetch, isPending: toDoIsPending } = useQuery({
        queryKey: ["toDoTaskLists", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/task?email=${user?.email}&category=toDo`);
            return res.data;
        }
    })

    const { data: inProgressTasksList = [], refetch: inProgressRefetch, isPending: inProgressIsPending } = useQuery({
        queryKey: ["inProgressTasksList", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/task?email=${user?.email}&category=inProgress`);
            return res.data;
        }
    })
    const { data: doneTasksList = [], refetch: doneRefetch, isPending: doneIsPending } = useQuery({
        queryKey: ["doneTasksList", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/task?email=${user?.email}&category=done`);
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
            <div className='max-w-7xl mx-auto my-10 font-semibold'>
                <div className='flex justify-between flex-col md:flex-row gap-8'>

                    {/* Todo List */}
                    <div className='rounded flex-1 p-6 bg-base-200'>
                        <div>
                            <h2 className='text-lg'>To-do List</h2>
                            <div className='my-4'>
                                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-primary btn-outline w-full"> <AiOutlineFileAdd className='text-lg'></AiOutlineFileAdd> Add New Task</button>
                            </div>

                            {/* Task Card */}
                            <div className='space-y-4'>
                                {
                                    toDoTasksList.map((toDoTask, idx) => <TaskCard idx = {idx} key={toDoTask?._id} toDoTask={toDoTask} ></TaskCard>)
                                }
                            </div>

                        </div>
                    </div>


                    {/* Todo List */}
                    <div className=' rounded flex-1 p-6 bg-base-200'>
                        <h2 className='text-lg'>In Progress</h2>
                        {/* Task Card */}
                        <div className='space-y-4 mt-4'>
                            {
                                inProgressTasksList.map((toDoTask, idx) => <TaskCard idx={idx} key={toDoTask?._id} toDoTask={toDoTask} ></TaskCard>)
                            }
                        </div>
                    </div>


                    {/* Todo List */}
                    <div className='rounded flex-1 p-6 bg-base-200'>
                        <h2 className='text-lg'>Done</h2>
                        {/* Task Card */}
                        <div className='space-y-4 mt-4'>
                            {
                                doneTasksList.map((toDoTask, idx) => <TaskCard idx={idx} key={toDoTask?._id} toDoTask={toDoTask} ></TaskCard>)
                            }
                        </div>
                    </div>

                </div>

                {/* Modal for Add New Task */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="card-body rounded-md min-w-md bg-base-100">
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