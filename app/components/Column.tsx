import { useDroppable } from '@dnd-kit/core';
import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};
export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className='flex w-96 flex-col bg-neutral-800/50 rounded-lg p-4'>
      <h1 className=' mb-4 font-semibold text-neutral-100 '>{column.title}</h1>
      <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
