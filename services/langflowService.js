const axios = require("../config/axios");
const config = require("../config/env");
const retry = require("../utils/retry");
const { extractMessage } = require("../utils/parser");

async function askAI(message, sessionId) {
    const response = await retry(async () => {
        return axios.post(
            config.langflow.url,
            {
                input_value: message,
                input_type: "chat",
                output_type: "chat",
                session_id: sessionId
            }, 
            {
                headers: {
                    "x-api-key": config.langflow.apiKey
                }
            }
        );
    });

    const aiMessage = extractMessage(response.data);
    if (!aiMessage) {
        throw new Error("Unable to parse Langflow response");
    }
    return aiMessage;
}

module.exports = {
    askAI
};