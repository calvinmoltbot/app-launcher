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
        <Search className="w-[17px] h-[17px] text-text-muted group-focus-within:text-primary transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-container-high/60 border-none rounded-[10px] py-2.5 pl-9 pr-4 text-[17px] outline-none transition-all placeholder:text-text-muted text-text-primary focus:bg-surface-container-high"
      />
    </div>
  );
}
