interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-neutral-700 px-10 py-8 rounded-lg'>
        <p className='text-white mb-4'>{message}</p>
        <div className='flex gap-4 justify-end'>
          <button
            className='px-4 py-2 bg-neutral-500 text-white rounded'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='px-4 py2 bg-red-600 text-white rounded'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
