'use client';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import Column from './components/Column';
import { Column as ColumnTypes, Task } from './types';

const COLUMNS: ColumnTypes[] = [
  { id: 'TODO', title: 'To do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Research Project',
    description: 'Gather requirements and create initial documentation',
    status: 'TODO',
  },
  {
    id: '2',
    title: 'Design Project',
    description: 'Create wireframes and design mockups',
    status: 'TODO',
  },
  {
    id: '3',
    title: 'Develop Project',
    description: 'Write code and implement features',
    status: 'IN_PROGRESS',
  },
  {
    id: '4',
    title: 'Test Project',
    description: 'Perform testing and fix bugs',
    status: 'IN_PROGRESS',
  },
  {
    id: '5',
    title: 'Deploy Project',
    description: 'Deploy to production and monitor performance',
    status: 'DONE',
  },
  {
    id: '6',
    title: 'Review Project',
    description: 'Review project and gather feedback',
    status: 'DONE',
  },
  {
    id: '7',
    title: 'Release Project',
    description: 'Release project to customers',
    status: 'IN_PROGRESS',
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  return (
    <div className=' flex pt-10 justify-center items-center'>
      <div className=' px-20 pb-20 bg-white/5 border border-white/10 rounded-lg'>
        <h1 className='text-white py-8 text-center text-2xl'>Drag and Drop</h1>
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
