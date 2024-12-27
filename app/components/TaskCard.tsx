import { useDraggable } from '@dnd-kit/core';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Task } from '../types';
import ActionsModal from './ActionsModal';

type TaskCardProps = {
  task: Task;
};
export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px,0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className='relative cursor-grab rounded-lg bg-neutral-700/30 p-4 shadow-sm hover:shadow-md flex justify-between items-center'
    >
      <div>
        <h3 className='font-medium text-neutral-100'>{task.title}</h3>
        <p className=' mt-2 text-sm text-neutral-400'>{task.description}</p>
      </div>
      <button onClick={handleClick} onPointerDown={(e) => e.stopPropagation()}>
        <EllipsisVerticalIcon className='w-5 h-5 text-white cursor-pointer' />
      </button>
      {isOpen && <ActionsModal onClose={handleClose} isOpen={isOpen} />}
    </div>
  );
}
