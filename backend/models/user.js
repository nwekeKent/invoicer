class User {
	constructor(id, name, email, companyName) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.companyName = companyName;
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
		};
	}
}

module.exports = User;
