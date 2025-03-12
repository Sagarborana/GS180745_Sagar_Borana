import { useState } from "react";

interface AddNewItemProps<T> {
  fields: { key: keyof T; placeholder: string; type?: string }[];
  title: string;
  onSave: (data: T) => void;
  onClose: () => void;
  initialState: T;
}

const AddNewItem = <T,>({ fields, title, onSave, onClose, initialState }: AddNewItemProps<T>) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (key: keyof T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    for (const field of fields) {
      if (!formData[field.key]) {
        alert(`Please fill the ${field.placeholder} field!`);
        return;
      }
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-3">
          {fields.map((field) => (
            <input
              key={field.key.toString()}
              type={field.type || "text"}
              placeholder={field.placeholder}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={String(formData[field.key])}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          ))}
        </div>
        <div className="flex justify-end space-x-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewItem;
