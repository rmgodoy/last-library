import { create } from "zustand";

type TDbObserver = {
  indexDbChanged: number;
  fireUpdate: () => void;
};

export const DbObserver = create<TDbObserver>((set) => ({
  indexDbChanged: 1,
  fireUpdate: () =>
    set((state) => ({ indexDbChanged: state.indexDbChanged + 1 })),
}));

export const indexDbChanged = DbObserver((state) => state.indexDbChanged);
