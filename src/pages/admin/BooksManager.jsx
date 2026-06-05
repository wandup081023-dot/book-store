import React, { useState, useContext } from 'react';
import { Plus } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import { ToastContext } from '../../context/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import BOOKS from '../../data/books';

export default function BooksManager() {
  const { books, addBook, updateBook, deleteBook } = useContext(AdminContext);
  const { showToast } = useContext(ToastContext);

  const safeBooks = books || BOOKS || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: "", author: "", genre: "Fiction", mrp: "", price: "", stock: "", cover: ""
  });

  const handleOpenModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({ title: "", author: "", genre: "Fiction", mrp: "", price: "", stock: "", cover: "" });
    }
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingBook) {
      updateBook({ ...formData, id: editingBook.id });
      showToast("Book updated successfully", "success");
    } else {
      addBook(formData);
      showToast("Book added successfully", "success");
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete.id);
      showToast("Book deleted", "info");
      setDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  const columns = [
    { label: "Book", render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.cover} alt={row.title} className="w-10 h-14 object-cover rounded shadow-sm" onError={(e) => { e.target.src = `https://picsum.photos/seed/${e.target.alt}/300/450` }} />
        <div>
          <p className="font-bold text-brand-navy">{row.title}</p>
          <p className="text-brand-muted text-xs">{row.author}</p>
        </div>
      </div>
    )},
    { label: "Genre", key: "genre" },
    { label: "MRP", render: (row) => `₹${row.mrp}` },
    { label: "Price", render: (row) => <span className="font-bold">₹{row.price}</span> },
    { label: "Stock", render: (row) => (
      <span className={row.stock < 10 ? "text-brand-red font-bold" : ""}>{row.stock}</span>
    )}
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-brand-navy">Books Manager</h1>
          <p className="font-inter text-sm text-brand-muted mt-1">Manage your store's inventory</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Book
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={safeBooks} 
        searchable 
        onEdit={handleOpenModal} 
        onDelete={(row) => { setBookToDelete(row); setDeleteModalOpen(true); }} 
      />

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBook ? "Edit Book" : "Add New Book"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Author</label>
              <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Genre</label>
              <select value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} className="w-full border p-2 rounded">
                <option>Fiction</option><option>Non-Fiction</option><option>Business</option><option>Self-Help</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Stock</label>
              <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">MRP (₹)</label>
              <input type="number" value={formData.mrp} onChange={e => setFormData({...formData, mrp: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Sale Price (₹)</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border p-2 rounded" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Cover Image URL</label>
            <input type="url" value={formData.cover} onChange={e => setFormData({...formData, cover: e.target.value})} className="w-full border p-2 rounded" required />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Book</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Delete" size="sm">
        <p className="mb-6">Are you sure you want to delete <strong>{bookToDelete?.title}</strong>?</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
