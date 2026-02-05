"use client";

import { useState, useMemo } from "react";
interface SearchableSelectProps {
    name: string
    selectItems: { _id: string; selectItemName: string }[];
    onSelect: (selectItemId: string) => void;
}

export default function SearchableSelect({ name, selectItems, onSelect }: SearchableSelectProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Filter selectItems based on the search query
    const filteredSelectItems = useMemo(() => {
        return query === ""
            ? selectItems
            : selectItems.filter((b) =>
                b.selectItemName.toLowerCase().includes(query.toLowerCase())
            );
    }, [query, selectItems]);

    return (
        <div className="relative w-full">
            <label className="block mb-1.5 font-medium text-gray-700">Select {name}</label>

            <input
                type="text"
                placeholder={`Search ${name} name...`}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className="w-full border rounded-lg p-2.5 outline-none focus:ring-4 focus:ring-blue-900/20 transition-all"
                required />

            {isOpen && filteredSelectItems.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredSelectItems.map((selectItem) => (
                        <li
                            key={selectItem._id}
                            onClick={() => {
                                onSelect(selectItem._id);
                                setQuery(selectItem.selectItemName);
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 transition-colors border-b last:border-none border-gray-50"
                        >
                            {selectItem.selectItemName}
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && query !== "" && filteredSelectItems.length === 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border p-3 text-sm text-gray-500 rounded-lg shadow-lg">
                    {`No ${name} found for "{query}"`}
                </div>
            )}
        </div>
    );
}