// context/InvoiceModalContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "new" | "edit" | "delete" | null;

interface ModalContextType {
	activeModal: ModalType;
	openModal: (modal: ModalType) => void;
	closeModal: () => void;
	selectedId?: string;
	setSelectedId: (id?: string) => void;
}

const InvoiceModalContext = createContext<ModalContextType | undefined>(
	undefined
);

export function InvoiceModalProvider({ children }: { children: ReactNode }) {
	const [activeModal, setActiveModal] = useState<ModalType>(null);
	const [selectedId, setSelectedId] = useState<string | undefined>();

	const openModal = (modal: ModalType) => setActiveModal(modal);
	const closeModal = () => setActiveModal(null);

	return (
		<InvoiceModalContext.Provider
			value={{ activeModal, openModal, closeModal, selectedId, setSelectedId }}
		>
			{children}
		</InvoiceModalContext.Provider>
	);
}

export function useInvoiceModal() {
	const context = useContext(InvoiceModalContext);
	if (!context)
		throw new Error(
			"useInvoiceModal must be used within an InvoiceModalProvider"
		);
	return context;
}
