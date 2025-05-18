import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, CheckCheck, Save, Edit, Trash } from 'lucide-react';

const categoriesData = [
  {
    id: '1',
    name: 'Clothes',
    icon: '👕',
    items: [
      { id: 'c1', name: 'T-shirts (5-7)', checked: false },
      { id: 'c2', name: 'Underwear (7-10)', checked: false },
      { id: 'c3', name: 'Socks (5-7 pairs)', checked: false },
      { id: 'c4', name: 'Pants/Shorts (3-4)', checked: false },
      { id: 'c5', name: 'Sweater/Jacket', checked: false },
      { id: 'c6', name: 'Sleepwear', checked: false },
      { id: 'c7', name: 'Swimwear', checked: false },
    ]
  },
  {
    id: '2',
    name: 'Toiletries',
    icon: '🧴',
    items: [
      { id: 't1', name: 'Toothbrush & Toothpaste', checked: false },
      { id: 't2', name: 'Shampoo & Conditioner', checked: false },
      { id: 't3', name: 'Soap/Body Wash', checked: false },
      { id: 't4', name: 'Deodorant', checked: false },
      { id: 't5', name: 'Razor & Shaving Cream', checked: false },
      { id: 't6', name: 'Sunscreen', checked: false },
      { id: 't7', name: 'Medications', checked: false },
    ]
  },
  {
    id: '3',
    name: 'Documents',
    icon: '📄',
    items: [
      { id: 'd1', name: 'Passport/ID', checked: false },
      { id: 'd2', name: 'Flight Tickets', checked: false },
      { id: 'd3', name: 'Hotel Reservations', checked: false },
      { id: 'd4', name: 'Travel Insurance', checked: false },
      { id: 'd5', name: 'Driver\'s License', checked: false },
      { id: 'd6', name: 'Credit/Debit Cards', checked: false },
      { id: 'd7', name: 'Local Currency', checked: false },
    ]
  },
  {
    id: '4',
    name: 'Tech',
    icon: '📱',
    items: [
      { id: 'e1', name: 'Phone & Charger', checked: false },
      { id: 'e2', name: 'Laptop & Charger', checked: false },
      { id: 'e3', name: 'Camera', checked: false },
      { id: 'e4', name: 'Headphones', checked: false },
      { id: 'e5', name: 'Power Bank', checked: false },
      { id: 'e6', name: 'Travel Adapter', checked: false },
      { id: 'e7', name: 'Memory Cards', checked: false },
    ]
  }
];

interface Item {
  id: string;
  name: string;
  checked: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  items: Item[];
}

const ChecklistPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [newItemText, setNewItemText] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string, name: string } | null>(null);
  
  const getProgress = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 0;
    
    const checkedItems = category.items.filter(item => item.checked).length;
    return category.items.length > 0 ? (checkedItems / category.items.length) * 100 : 0;
  };
  
  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, checked: !item.checked };
            }
            return item;
          })
        };
      }
      return category;
    }));
  };
  
  const addNewItem = () => {
    if (newItemText.trim() === '') return;
    
    setCategories(categories.map(category => {
      if (category.id === activeCategory) {
        return {
          ...category,
          items: [
            ...category.items,
            { id: `new-${Date.now()}`, name: newItemText, checked: false }
          ]
        };
      }
      return category;
    }));
    
    setNewItemText('');
  };
  
  const removeItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter(item => item.id !== itemId)
        };
      }
      return category;
    }));
  };
  
  const startEditing = (item: Item) => {
    setEditingItem({ id: item.id, name: item.name });
    setIsEditing(true);
  };
  
  const updateItem = () => {
    if (!editingItem || editingItem.name.trim() === '') return;
    
    setCategories(categories.map(category => {
      if (category.id === activeCategory) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === editingItem.id) {
              return { ...item, name: editingItem.name };
            }
            return item;
          })
        };
      }
      return category;
    }));
    
    setIsEditing(false);
    setEditingItem(null);
  };
  
  const checkAllItems = (categoryId: string, checked: boolean) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => ({ ...item, checked }))
        };
      }
      return category;
    }));
  };
  
  // Get the active category
  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="mb-3">Trip Packing Checklist</h1>
          <p className="text-neutral-600 max-w-2xl">
            Keep track of all your essential items with our customizable packing checklist.
            Add, edit, or remove items to tailor it to your specific trip needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              
              <div className="space-y-3">
                {categories.map(category => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ x: 5 }}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors duration-300 ${
                      activeCategory === category.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex-1 flex items-center">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <div className="flex-1">
                        <span className="block font-medium">{category.name}</span>
                        <div className="w-full h-1.5 bg-neutral-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${getProgress(category.id)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-neutral-500">
                      {category.items.filter(item => item.checked).length}/{category.items.length}
                    </span>
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={() => {
                    // Function to save or export the list
                    alert('Checklist saved successfully!');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors duration-300"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Checklist</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Checklist Content */}
          <div className="lg:col-span-3">
            {currentCategory && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Category Header */}
                <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentCategory.icon}</span>
                    <h2 className="text-2xl font-semibold">{currentCategory.name}</h2>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => checkAllItems(currentCategory.id, true)}
                      className="p-2 text-neutral-600 hover:text-primary-500 transition-colors duration-300"
                    >
                      <CheckCheck className="w-5 h-5" />
                    </button>
                    <span className="text-neutral-500">
                      {currentCategory.items.filter(item => item.checked).length}/{currentCategory.items.length} items
                    </span>
                  </div>
                </div>
                
                {/* Items List */}
                <div className="p-6">
                  <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {currentCategory.items.map(item => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center p-3 border rounded-lg ${
                          item.checked 
                            ? 'bg-neutral-50 border-neutral-200' 
                            : 'bg-white border-neutral-200'
                        } transition-colors duration-300`}
                      >
                        <div className="flex-1 flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleItem(currentCategory.id, item.id)}
                            className="w-5 h-5 rounded text-primary-500 focus:ring-primary-500"
                          />
                          
                          {isEditing && editingItem?.id === item.id ? (
                            <input
                              type="text"
                              value={editingItem.name}
                              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                              className="input-field py-1"
                              autoFocus
                            />
                          ) : (
                            <span className={`${item.checked ? 'line-through text-neutral-500' : ''}`}>
                              {item.name}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isEditing && editingItem?.id === item.id ? (
                            <button
                              onClick={updateItem}
                              className="p-1.5 text-success-500 hover:text-success-600 transition-colors duration-300"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => startEditing(item)}
                              className="p-1.5 text-neutral-400 hover:text-primary-500 transition-colors duration-300"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => removeItem(currentCategory.id, item.id)}
                            className="p-1.5 text-neutral-400 hover:text-error-500 transition-colors duration-300"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Add New Item */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="Add a new item..."
                        className="input-field"
                        onKeyDown={(e) => e.key === 'Enter' && addNewItem()}
                      />
                      
                      <button
                        onClick={addNewItem}
                        className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;