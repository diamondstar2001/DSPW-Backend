const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contact");
const questionnaireRoutes = require("./routes/questionnaire"); // Add this line

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/questionnaire", questionnaireRoutes);  // Add this route

app.get("/", (req, res) => {
    res.send("Al Bony Press API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
