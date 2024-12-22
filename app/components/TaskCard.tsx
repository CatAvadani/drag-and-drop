import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types';

type TaskCardProps = {
  task: Task;
};
export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

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
      className=' cursor-grab rounded-lg bg-neutral-700/30 p-4 shadow-sm hover:shadow-md'
    >
      <h3 className='font-medium text-neutral-100'>{task.title}</h3>
      <p className=' mt-2 text-sm text-neutral-400'>{task.description}</p>
    </div>
  );
}
