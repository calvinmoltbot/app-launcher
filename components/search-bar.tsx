"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#0F49BD] transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search apps..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-[#0F49BD]/20 focus:border-[#0F49BD] outline-none transition-all placeholder:text-slate-400 text-slate-700"
      />
    </div>
  );
}
