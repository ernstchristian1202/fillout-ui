"use client";

import { useState } from "react";

type PromptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title?: string;
  placeholder?: string;
  initValue?: string;
};

export default function PromptModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Your Text",
  placeholder = "",
  initValue= ""
}: PromptModalProps) {
  const [input, setInput] = useState(initValue);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(input);
    setInput("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-3 py-1 rounded bg-blue-500 font-bold">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
