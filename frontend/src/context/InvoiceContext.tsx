"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface InvoiceContextType {
	invoices: any[];
	setInvoices: (invoices: any[]) => void;
	invoiceFilter: string;
	setInvoiceFilter: (filter: string) => void;
	isNewInvoiceOpen: boolean;
	setIsNewInvoiceOpen: (isOpen: boolean) => void;
	isEditInvoiceOpen: boolean;
	setIsEditInvoiceOpen: (isOpen: boolean) => void;
	isDeleteModalOpen: boolean;
	setIsDeleteModalOpen: (isOpen: boolean) => void;
	crudAction: boolean;
	setCrudAction: (action: boolean) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
	const [invoices, setInvoices] = useState<any[]>([]);
	const [invoiceFilter, setInvoiceFilter] = useState("All");
	const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
	const [isEditInvoiceOpen, setIsEditInvoiceOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [crudAction, setCrudAction] = useState(false);

	const value = {
		invoices,
		setInvoices,
		invoiceFilter,
		setInvoiceFilter,
		isNewInvoiceOpen,
		setIsNewInvoiceOpen,
		isEditInvoiceOpen,
		setIsEditInvoiceOpen,
		isDeleteModalOpen,
		setIsDeleteModalOpen,
		crudAction,
		setCrudAction,
	};

	return (
		<InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
	);
}

export function useInvoice() {
	const context = useContext(InvoiceContext);
	if (context === undefined) {
		throw new Error("useInvoice must be used within an InvoiceProvider");
	}
	return context;
}
