const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contact");
const questionnaireRoutes = require("./routes/questionnaire");

dotenv.config();

const app = express();

// ✅ Proper CORS setup to fix preflight & origin issues
app.use(cors({
    origin: ['https://diamondstarprintingworks.com/', 'https://goldenrod-dolphin-610577.hostingersite.com/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

app.use(express.json());

// ✅ Routes
app.use("/api/contact", contactRoutes);
app.use("/api/questionnaire", questionnaireRoutes);

// ✅ Root route
app.get("/", (req, res) => {
    res.send("Al Bony Press API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
