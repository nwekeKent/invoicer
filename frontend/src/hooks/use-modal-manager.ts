// hooks/useModalManager.ts
import { useState, useCallback } from "react";

type ModalType = "new-invoice" | "edit-invoice" | "delete-invoice" | null;

export function useModalManager() {
	const [activeModal, setActiveModal] = useState<ModalType>(null);
	const [selectedId, setSelectedId] = useState<string>();

	const openModal = useCallback((modal: ModalType, id?: string) => {
		setActiveModal(modal);
		if (id) setSelectedId(id);
	}, []);

	const closeModal = useCallback(() => {
		setActiveModal(null);
		setSelectedId(undefined);
	}, []);

	const isModalOpen = useCallback(
		(modal: ModalType) => {
			return activeModal === modal;
		},
		[activeModal]
	);

	return {
		activeModal,
		selectedId,
		openModal,
		closeModal,
		isModalOpen,
	};
}
