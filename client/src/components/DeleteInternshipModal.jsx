export default function DeleteInternshipModal({ onConfirm, onClose }) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl space-y-4">
          <p>Delete this internship?</p>
          <div className="flex gap-4 justify-end">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  