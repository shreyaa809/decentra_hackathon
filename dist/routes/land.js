"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const landDb_1 = require("../landDb");
const db_1 = require("../db");
const revokedDb_1 = require("./revokedDb");
const requireRole_1 = require("../middleware/requireRole");
const router = (0, express_1.Router)();
router.post("/verify", (0, requireRole_1.requireRole)("officer"), (req, res) => {
    const { aadhaar, khasraNo, approvedByTehsildar } = req.body;
    if (!aadhaar || !khasraNo) {
        return res.status(400).json({ error: "Missing fields" });
    }
    if (!db_1.aadhaarRegistry.has(aadhaar)) {
        return res.status(404).json({ error: "Farmer not onboarded" });
    }
    if (revokedDb_1.revokedFarmers.has(aadhaar)) {
        return res.status(403).json({
            error: "Farmer identity revoked. Land verification blocked."
        });
    }
    const owner = landDb_1.landRegistry.get(khasraNo);
    if (owner !== aadhaar) {
        return res.status(403).json({ error: "Land ownership mismatch" });
    }
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
