import { create } from 'zustand'

export type TSearchStore = {
    searchTxt: string;
    setSearchTxt: (text: string) => void;
}

export const useSearchStore = create<TSearchStore>((set) => ({
    searchTxt: '',
    setSearchTxt: (text: string) => set(() => {
        return { searchTxt: text }
    })
}))