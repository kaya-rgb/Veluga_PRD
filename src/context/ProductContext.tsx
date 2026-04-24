import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { products } from '../data/products';

type Ctx = {
  selectedId: string;
  setSelectedId: (id: string) => void;
};

const ProductContext = createContext<Ctx | null>(null);
const STORAGE_KEY = 'veluga.selectedProduct';

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedIdState] = useState<string>(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored && products.some((p) => p.id === stored)) return stored;
    return products[0].id;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedId);
  }, [selectedId]);

  const setSelectedId = (id: string) => setSelectedIdState(id);

  return (
    <ProductContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useSelectedProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useSelectedProduct must be used within ProductProvider');
  return ctx;
}
