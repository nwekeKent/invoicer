function generateCustomId() {
	const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const digits = "0123456789";
	const alphabetLength = 2;
	const digitLength = 4;

	// Generate the first two alphabet characters
	const alphabetPart = Array.from(
		{ length: alphabetLength },
		() => alphabets[Math.floor(Math.random() * alphabets.length)]
	).join("");

	// Generate the last four numeric characters
	const digitPart = Array.from(
		{ length: digitLength },
		() => digits[Math.floor(Math.random() * digits.length)]
	).join("");

	// Concatenate the parts and add the hash symbol
	return `${alphabetPart}${digitPart}`;
}

module.exports = generateCustomId;
