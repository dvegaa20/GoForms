import { create } from "zustand";
import { setCookie } from "cookies-next";

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export const useEditingMode = create<EditingModeState>((set) => ({
  isEditingMode: false,
  setEditingMode: (value) => set({ isEditingMode: value }),
  toggleEditingMode: () =>
    set((state) => ({ isEditingMode: !state.isEditingMode })),
}));

export const useFormStore = create<FormState>((set) => ({
  title: "New Form",
  setTitle: (title) => set({ title }),
}));

export const useFormOrTemplateStore = create<FormStore>((set) => ({
  selectedOption: "me",
  setSelectedOption: (option) => {
    set({ selectedOption: option });
    setCookie("selectedOption", option);
  },
}));
