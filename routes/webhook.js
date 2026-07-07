const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.json({
        success: true,
        message: "Webhook route ready."
    });
});

module.exports = router;