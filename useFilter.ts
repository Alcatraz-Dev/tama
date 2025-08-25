"use client";
import { create } from "zustand";

type State = { category: string | null };
type Actions = { setCategory: (c: string | null) => void };

export const useFilter = create<State & Actions>((set) => ({
  category: null,
  setCategory: (c) => set({ category: c }),
}));