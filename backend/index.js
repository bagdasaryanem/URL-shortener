const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.use("/api/user", require("./routes/user"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
