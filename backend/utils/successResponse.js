class SuccessResponse {
	/**
	 * Sends a 200 OK response.
	 * Ideal for GET, PUT, or PATCH requests.
	 * @param {object} res - The Express response object.
	 * @param {object} data - The data payload to be sent.
	 * @param {string} [message='Request successful'] - An optional success message.
	 */
	static ok(res, data, message = "Request successful") {
		res.status(200).json({
			status: "success",
			message,
			data,
		});
	}

	/**
	 * Sends a 201 Created response.
	 * Ideal for POST requests that result in the creation of a new resource.
	 * @param {object} res - The Express response object.
	 * @param {object} data - The data payload of the newly created resource.
	 * @param {string} [message='Resource created successfully'] - An optional success message.
	 */
	static created(res, data, message = "Resource created successfully") {
		res.status(201).json({
			status: "success",
			message,
			data,
		});
	}

	/**
	 * Sends a 204 No Content response.
	 * Ideal for requests that are successfully processed but do not need to return any data,
	 * such as a DELETE request.
	 * @param {object} res - The Express response object.
	 */
	static noContent(res) {
		res.status(204).end();
	}
}

module.exports = SuccessResponse;
