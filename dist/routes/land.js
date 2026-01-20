"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const landDb_1 = require("../landDb");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/verify", (req, res) => {
    const { aadhaar, khasraNo, approvedByTehsildar } = req.body;
    if (!aadhaar || !khasraNo) {
        return res.status(400).json({ error: "Missing fields" });
    }
    // Check farmer exists
    if (!db_1.aadhaarRegistry.has(aadhaar)) {
        return res.status(404).json({ error: "Farmer not onboarded" });
    }
    // Check land ownership
    const owner = landDb_1.landRegistry.get(khasraNo);
    if (owner !== aadhaar) {
        return res.status(403).json({ error: "Land ownership mismatch" });
    }
    // Tehsildar approval required
    if (!approvedByTehsildar) {
        return res.status(401).json({ error: "Tehsildar approval required" });
    }
    return res.json({
        message: "Land verified successfully",
        landCredential: {
            khasraNo,
            ownerAadhaar: aadhaar,
            verified: true,
            approvedBy: "Tehsildar"
        }
    });
});
exports.default = router;
