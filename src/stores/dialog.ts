import { create } from "zustand";

interface Dialog {
  name: string;
  mode?: string;
  payload?: unknown;
}

interface DialogState {
  dialog: Dialog | null;
  setDialog: (dialog: Dialog | null) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialog: null,
  setDialog: (dialog) => set({ dialog }),
}));

interface UseDialogReturn<T> {
  isOpen: boolean;
  mode?: string;
  payload?: T;
  open: (mode?: string, payload?: T) => void;
  close: () => void;
}

export const useDialog = <T>(name: string): UseDialogReturn<T> => {
  const dialog = useDialogStore((state) =>
    state.dialog?.name === name ? state.dialog : null
  );

  return {
    isOpen: !!dialog,
    mode: dialog?.mode,
    payload: dialog?.payload as T,
    open: (mode?: string, payload?: T) =>
      useDialogStore.setState({ dialog: { name, mode, payload } }),
    close: () => useDialogStore.setState({ dialog: null }),
  };
};
