'use client';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import AddNewTaskModal from './components/AddNewTaskModal';
import Column from './components/Column';
import { useTaskStore } from './store';
import { Column as ColumnTypes, Task } from './types';

const COLUMNS: ColumnTypes[] = [
  { id: 'TODO', title: 'To do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

export default function Home() {
  const { tasks, moveTask } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    moveTask(taskId, newStatus);
  }

  return (
    <div className='flex pt-10 justify-center items-center'>
      <div className='px-20 pb-20 bg-white/5 border border-white/10 rounded-lg'>
        <h1 className='text-white py-8 text-center text-2xl'>Drag and Drop</h1>

        <button
          onClick={() => setIsOpen(true)}
          className='flex justify-center items-center gap-2 px-6 py-2 bg-violet-900 text-white mb-4 rounded-lg hover:bg-violet-700 transform transition-colors duration-200'
        >
          <PlusIcon className='w-4 h-4' /> Add New Task
        </button>

        {isOpen && <AddNewTaskModal isOpen onClose={() => setIsOpen(false)} />}

        <div className='flex gap-8'>
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </DndContext>
        </div>
      </div>
    </div>
  );
}
