class User {
	constructor(
		id,
		name,
		email,
		companyName,
		streetAddress,
		city,
		postCode,
		country
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.companyName = companyName;
		this.streetAddress = streetAddress;
		this.city = city;
		this.postCode = postCode;
		this.country = country;
	}

	static fromFirestore(doc) {
		const data = doc.data();
		return {
			id: doc.id,
			...data,
		};
	}

	toFirestore() {
		return {
			name: this.name,
			email: this.email,
			companyName: this.companyName,
			address: {
				streetAddress: this.streetAddress,
				city: this.city,
				postCode: this.postCode,
				country: this.country,
			},
		};
	}
}

module.exports = User;
