import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		padding: "40px",
		width: "100%",
		fontFamily: "Helvetica",
	},

	// Text styling
	h1: {
		color: "black",
		fontSize: "12px",
		fontWeight: 700,
		marginBottom: "5px",
	},

	span: {
		color: "#888eb0",
	},

	p: {
		color: "#888eb0",
		fontSize: "10px",
		fontWeight: 500,
	},

	// Layout sections
	topSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: "30px",
	},

	bottomSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: "30px",
	},

	invoiceDate: {
		flexDirection: "column",
		gap: "10px",
	},

	// Invoice breakdown styling
	invoiceBreakdown: {
		marginTop: "30px",
	},

	breakdownHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#f9fafe",
		padding: "15px",
	},

	breakdownList: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: "15px",
		backgroundColor: "#f9fafe",
	},

	breakdownPricing: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: "20px",
		width: "60%",
	},

	totalAmountSection: {
		backgroundColor: "#373b53",
		color: "#FFF",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "20px",
		borderBottomLeftRadius: "8px",
		borderBottomRightRadius: "8px",
	},
	totalText: {
		fontSize: "12px",
		fontWeight: 500,
	},
	totalValue: {
		fontSize: "20px",
		fontWeight: 700,
	},
});

// Function to sum the total amounts
const sumTotal = (items: { quantity: any; price: any }[]) => {
	return items.reduce(
		(acc, item) => acc + Number(item.quantity) * Number(item.price),
		0
	);
};

const InvoicePdf = ({ invoice }: any) => {
	return (
		<Document pageLayout="singlePage">
			<Page size="A4" style={styles.page}>
				{/* Top Section */}
				<View style={styles.topSection}>
					<View>
						<Text style={styles.h1}>
							Invoice <span>#{invoice.id}</span>{" "}
						</Text>
						<Text style={styles.p}>{invoice.projectDescription}</Text>
					</View>

					<View>
						<Text style={styles.p}>{invoice?.streetAddress}</Text>
						<Text style={styles.p}>{invoice?.city}</Text>
						<Text style={styles.p}>{invoice?.postCode}</Text>
						<Text style={styles.p}>{invoice?.country}</Text>
					</View>
				</View>

				{/* Bottom Section */}
				<View style={styles.bottomSection}>
					<View style={styles.invoiceDate}>
						<View>
							<Text style={[styles.p, { marginBottom: "10px" }]}>
								Invoice Date
							</Text>
							<Text style={styles.h1}>{invoice.invoiceDate}</Text>
						</View>

						<View>
							<Text style={[styles.p, { marginBottom: "10px" }]}>
								Payment Due
							</Text>
							<Text style={styles.h1}>{invoice.dueDate}</Text>
						</View>
					</View>

					<View>
						<Text style={[styles.p, { marginBottom: "10px" }]}>Bill To</Text>
						<Text style={styles.h1}>{invoice.clientName}</Text>
						<Text style={styles.p}>{invoice?.clientStreetAddress}</Text>
						<Text style={styles.p}>{invoice?.clientCity}</Text>
						<Text style={styles.p}>{invoice?.clientPostCode}</Text>
						<Text style={styles.p}>{invoice?.clientCountry}</Text>
					</View>

					<View>
						<Text style={[styles.p, { marginBottom: "10px" }]}>Sent To</Text>
						<Text style={styles.h1}>{invoice.clientEmail}</Text>
					</View>
				</View>

				{/* Invoice Breakdown */}
				<View style={styles.invoiceBreakdown}>
					{/* Header */}
					<View style={styles.breakdownHeader}>
						<Text style={styles.p}>Item Name</Text>
						<View style={styles.breakdownPricing}>
							<Text style={[styles.p, { marginRight: "91px" }]}>QTY.</Text>
							<Text style={[styles.p, { marginRight: "91px" }]}>Price</Text>
							<Text style={styles.p}>Total</Text>
						</View>
					</View>

					{/* Items List */}
					{invoice.itemList.map((item: any, index: number) => (
						<View key={index} style={styles.breakdownList}>
							<Text style={styles.h1}>{item.itemName}</Text>
							<View style={styles.breakdownPricing}>
								<Text style={[styles.p, { marginRight: "91px" }]}>
									{item.quantity}
								</Text>
								<Text style={[styles.p, { marginRight: "91px" }]}>
									${item.price}
								</Text>
								<Text style={styles.p}>
									${Number(item.quantity) * Number(item.price)}
								</Text>
							</View>
						</View>
					))}

					{/* Total Amount */}
					<View style={styles.totalAmountSection}>
						<Text style={styles.totalText}>Amount Due</Text>
						<Text style={styles.totalValue}>${sumTotal(invoice.itemList)}</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default InvoicePdf;
