import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full max-w-xs w-full shadow-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)} // notify parent
        placeholder="Search..."
        className="flex-1 outline-none text-sm bg-transparent"
      />
      <Search className="w-5 h-5 text-gray-500" />
    </div>
  );
}

export default SearchInput;