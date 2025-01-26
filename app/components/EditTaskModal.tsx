import { useState } from "react";
import { useTaskStore } from "../store";

export default function EditTaskModal({
  onClose,
  isOpen,
  task,
}: EditTaskModalProps) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const [formValues, setFormValues] = useState({
    title: task.title,
    description: task.description,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask(task.id, formValues);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <form
        onSubmit={handleSubmit}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.stopPropagation();
          }
        }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-[500px] h-[320px] p-6 rounded-lg bg-neutral-500/20 backdrop-blur-3xl shadow-lg border border-white/20"
      >
        <h1 className="text-lg font-semibold text-center mb-2 text-white">
          Edit Task
        </h1>
        <input
          type="text"
          value={formValues.title}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter title"
          className="w-full p-2 border border-white/30 rounded-md focus:outline-none focus:ring focus:ring-purple-300/50 bg-black/70 text-white"
        />
        <textarea
          placeholder="Enter description"
          rows={4}
          value={formValues.description}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full h-24 p-2 border border-white/30 rounded-md focus:outline-none focus:ring focus:ring-purple-300/50 bg-black/70 text-white resize-none"
        />
        <div className="flex justify-end gap-4 mt-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-violet-900 rounded-lg hover:bg-violet-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
