import { create } from "zustand";

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export const useEditingMode = create<EditingModeState>((set) => ({
  isEditingMode: false,
  toggleEditingMode: () =>
    set((state) => ({ isEditingMode: !state.isEditingMode })),
}));
