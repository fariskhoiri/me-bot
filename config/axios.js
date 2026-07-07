const axios = require("axios");
const config = require("./env");

const axiosInstance = axios.create({
    timeout: config.http.timeout,
    headers: {
        "Content-Type": "application/json"
    }
});

module.exports = axiosInstance;