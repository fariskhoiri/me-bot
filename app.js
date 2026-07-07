const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const config = require("./config/env");
const webhookRoute = require("./routes/webhook");
const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.json({
        application: "WhatsApp AI Chatbot",
        status: "Running"
    });
});

app.use("/webhook", webhookRoute);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found."
    });
});

app.listen(config.app.port, () => {
    console.log(
        `Server running on port ${config.app.port}`
    );
});