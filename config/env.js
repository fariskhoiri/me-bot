require("dotenv").config();

module.exports = {
    app: {
        port: Number(process.env.PORT) || 3000,
        nodeEnv: process.env.NODE_ENV || "development"
    },

    fonnte: {
        token: process.env.FONNTE_TOKEN
    },

    langflow: {
        url: process.env.LANGFLOW_URL,
        apiKey: process.env.LANGFLOW_API_KEY
    },

    http: {
        timeout: Number(process.env.REQUEST_TIMEOUT) || 60000
    }
};