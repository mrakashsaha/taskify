import moment from 'moment';
import React from 'react';
import { MdAccessTime } from 'react-icons/md';

const TaskCard = ({ idx, task }) => {
    return (
        <div className='card-body rounded-md bg-base-100'>
            {/* <h2 className='text-lg'></h2>
            <p>{toDoTask?.taskDescription}</p> */}
            <div className="text-3xl font-thin opacity-30 tabular-nums">{String(idx + 1).padStart(2, 0)}</div>
            <div>
                <div className='text-lg'>{task?.taskTitle}</div>
            </div>
                <div className="text-xs inline-flex items-center gap-1 uppercase font-semibold opacity-60"> <MdAccessTime></MdAccessTime> {moment(task?.date).format("DD-MM-YYYY hh:mm A")}</div>
            <p className="text-xs">
                {task?.taskDescription}
            </p>
        </div>
    );
};

export default TaskCard;