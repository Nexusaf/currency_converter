import app from "../app.js";
import debug from "debug";

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

const log = debug("currency_converter:*");
app.listen(port, ()=> log(`Server running on port ${port}`));