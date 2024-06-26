const generatecustomId = require("../helpers/generateCustomId");

class Item {
	constructor(itemName, quantity, price) {
		if (typeof itemName !== "string") {
			throw new Error("Item name must be a string.");
		}
		if (typeof quantity !== "number" || quantity <= 0) {
			throw new Error("Quantity must be a positive number.");
		}
		if (typeof price !== "number" || price < 0) {
			throw new Error("Price must be a non-negative number.");
		}

		this.itemName = itemName;
		this.quantity = quantity;
		this.price = price;
		this.total = this.price * this.quantity;
	}

	toPlainObject() {
		return {
			itemName: this.itemName,
			quantity: this.quantity,
			price: this.price,
			total: this.total,
		};
	}
}

class Invoice {
	constructor(
		userId,
		streetAddress,
		city,
		postCode,
		country,
		clientName,
		clientEmail,
		clientStreetAddress,
		clientCity,
		clientPostCode,
		clientCountry,
		invoiceDate,
		projectDescription,
		status,
		itemList
	) {
		this.id = generatecustomId();
		this.userId = userId;
		this.streetAddress = streetAddress;
		this.city = city;
		this.postCode = postCode;
		this.country = country;
		this.clientName = clientName;
		this.clientEmail = clientEmail;
		this.clientStreetAddress = clientStreetAddress;
		this.clientCity = clientCity;
		this.clientPostCode = clientPostCode;
		this.clientCountry = clientCountry;
		this.invoiceDate = invoiceDate;
		this.projectDescription = projectDescription;
		this.status = status;

		// Validate itemList
		if (!Array.isArray(itemList)) {
			throw new Error("itemList must be an array.");
		}
		this.itemList = itemList.map(
			item => new Item(item.itemName, item.quantity, item.price)
		);
	}

	static fromFirestore(doc) {
		const data = doc.data();
		return {
			...data,
		};
	}

	toFirestore() {
		return {
			id: this.id,
			userId: this.userId,
			status: this.status,
			clientName: this.clientName,
			clientEmail: this.clientEmail,
			billFrom: {
				streetAddress: this.streetAddress,
				city: this.city,
				postCode: this.postCode,
				country: this.country,
			},
			billTo: {
				streetAddress: this.clientStreetAddress,
				city: this.clientCity,
				postCode: this.clientPostCode,
				country: this.clientCountry,
			},
			invoiceDate: this.invoiceDate,
			projectDescription: this.projectDescription,
			itemList: this.itemList.map(item => item.toPlainObject()),
		};
	}
}

module.exports = Invoice;