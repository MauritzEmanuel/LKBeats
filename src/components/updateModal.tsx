import { Beat } from '@/types/beat';
import React, { useState } from 'react';

type UpdateModalProps = {
  beat: Beat;
  onClose: () => void;
  onSave: (newTitle: string, newPrice: number) => void;
};

export const UpdateModal = ({ beat, onClose, onSave }: UpdateModalProps) => {
  const [title, setTitle] = useState(beat.title);
  const [price, setPrice] = useState(beat.price.toString());

  const handleSubmit = () => {
    const parsedPrice = parseFloat(price);
    if (!title || isNaN(parsedPrice)) return;
    onSave(title, parsedPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Update beat</h2>

        <label className="block mb-2 text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 text-sm font-medium">Pris</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <p className="text-sm text-gray-600 mb-4">
          Want to change audio/image? Delete and create a new one.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
