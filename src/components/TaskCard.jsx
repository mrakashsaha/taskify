import moment from 'moment';
import React from 'react';
import { MdAccessTime, MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';



const TaskCard = ({ idx, task, handleEditTask, handleDeleteTask}) => {

    return (
        <div className='card-body rounded-md bg-base-100'>
            <div className="text-3xl font-thin opacity-30 tabular-nums">{String(idx + 1).padStart(2, 0)}</div>
            <div>
                <div className='text-lg'>{task?.taskTitle}</div>
            </div>
            <div className="text-xs inline-flex items-center gap-1 uppercase font-semibold opacity-60"> <MdAccessTime></MdAccessTime> {moment(task?.date).format("DD-MM-YYYY hh:mm A")}</div>
            <p className="text-xs">
                {task?.taskDescription}
            </p>
            <div className='flex mt-4 gap-x-3 justify-end'>
                <button className='btn btn-circle btn-soft btn-secondary' onClick={() => handleDeleteTask(task?._id)}> <MdDeleteOutline className='text-lg'></MdDeleteOutline ></button>
                <button className='btn btn-circle btn-soft btn-success' onClick={() => handleEditTask(task?._id)}> <MdOutlineEdit className='text-lg'></MdOutlineEdit ></button>
            </div>
        </div>
    );
};

export default TaskCard;