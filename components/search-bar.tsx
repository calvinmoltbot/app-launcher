"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-[17px] h-[17px] text-[#AEAEB2] group-focus-within:text-[#007AFF] transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/[0.04] border-none rounded-[10px] py-2.5 pl-9 pr-4 text-[17px] outline-none transition-all placeholder:text-[#AEAEB2] text-[#1D1D1F] focus:bg-black/[0.06]"
      />
    </div>
  );
}
