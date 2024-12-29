'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from './types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
}

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

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: INITIAL_TASKS,
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);
