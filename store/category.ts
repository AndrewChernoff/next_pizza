import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CategoryState {
    categoryId: number
    setCategoryId: (value: number) => void
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    persist(
      (set) => ({
        categoryId: 1,
        setCategoryId: (categoryId: number) => set({ categoryId }),
      }),
      { name: 'category' },
    ),
  ),
)