import app from "../app.js";
import debug from "debug";

const port = process.env.PORT || 3000;
const log = debug(`currency_converter:*`);

app.listen(port, _=> log(`Server running on port ${port}`));