import React, { useState } from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';

export default function DataTable({ columns, data, searchable = false, onEdit, onDelete, emptyMessage = "No data found." }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchable && searchTerm
    ? data.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <div className="relative max-w-sm w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-inter text-sm outline-none focus:border-brand-navy bg-white" 
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left font-inter">
          <thead className="bg-gray-50 text-brand-muted text-xs uppercase tracking-wider">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-semibold">{col.label}</th>
              ))}
              {(onEdit || onDelete) && <th className="px-6 py-4 font-semibold text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((row, rowIdx) => (
              <tr key={row.id || rowIdx} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 text-sm text-brand-text">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2">
                        <Pencil size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="p-10 text-center text-brand-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
