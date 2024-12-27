import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface ActionsModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function ActionsModal({ onClose, isOpen }: ActionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className='absolute top-4 right-0 z-50 bg-neutral-700 rounded-lg shadow-lg p-2 border border-white/10'>
      <div className='flex flex-col gap-2'>
        <button className='text-white hover:bg-neutral-600 px-4 py-2 rounded flex justify-start items-center gap-4'>
          <PencilIcon className='w-4 h-4' /> Edit
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log('Delete clicked');
            onClose();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className='text-white hover:bg-neutral-600 px-4 py-2 rounded flex justify-start items-center gap-4'
        >
          <TrashIcon className='w-4 h-4' /> Delete
        </button>
      </div>
    </div>
  );
}
