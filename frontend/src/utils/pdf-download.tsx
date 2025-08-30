import { pdf } from "@react-pdf/renderer";
import InvoicePdf from "@/components/invoices/components/InvoicePdf";

export const pdfDownload = async (invoiceData: any, closeModal: () => void) => {
	const doc = <InvoicePdf invoice={invoiceData} />;
	const pdfBlob = await pdf(doc).toBlob();

	// Create a link to download the PDF
	const url = URL.createObjectURL(pdfBlob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `invoice ${invoiceData.id}.pdf`;
	a.click();
	closeModal();
};
