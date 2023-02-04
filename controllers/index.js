export default function index(req, res) {
	const data = {
		project: "currency_converter",
		id_format: "|#####| string with length 5. # must to be number or alphanumeric",
		register: "provide your /register/ID for save your ID.",
		your_history: "provide your /revocer/ID for catch your history.",
		convert_tool: "/convert/ID for exchange convert and record a operation"
	};

	res.status = 200;
	res.json(data);
}