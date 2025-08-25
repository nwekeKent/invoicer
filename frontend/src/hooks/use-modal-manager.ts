import { create } from "zustand";

type ModalType = "new-invoice" | "edit-invoice" | "delete-invoice" | null;

interface ModalStore {
	activeModal: ModalType;
	selectedId?: string;
	openModal: (modal: ModalType, id?: string) => void;
	closeModal: () => void;
}

export const useModalManager = create<ModalStore>(set => ({
	activeModal: null,
	selectedId: undefined,

	openModal: (modal, id) => {
		console.log("Opening modal:", modal);
		set({ activeModal: modal, selectedId: id });
	},

	closeModal: () => {
		set({ activeModal: null, selectedId: undefined });
	},
}));
