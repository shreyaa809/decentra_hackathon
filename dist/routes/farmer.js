"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const revokedDb_1 = require("./revokedDb");
const requireRole_1 = require("../middleware/requireRole");
const router = (0, express_1.Router)();
/**
 * OFFICER ONLY: Onboard farmer
 */
router.post("/onboard", (0, requireRole_1.requireRole)("officer"), (req, res) => {
    const { aadhaar } = req.body;
    if (!aadhaar) {
        return res.status(400).json({ error: "Aadhaar required" });
    }
    if (revokedDb_1.revokedFarmers.has(aadhaar)) {
        return res.status(403).json({
            error: "Revoked farmer cannot be re-onboarded"
        });
    }
    if (db_1.aadhaarRegistry.has(aadhaar)) {
        return res.status(409).json({
            error: "Aadhaar already linked to a DID"
        });
    }
    const did = `did:ethr:sepolia:${Math.random()
        .toString(16)
        .slice(2, 10)}`;
    db_1.aadhaarRegistry.set(aadhaar, did);
    db_1.didRegistry.set(did, aadhaar);
    return res.json({
        message: "Farmer onboarded successfully",
        did
    });
});
/**
 * OFFICER ONLY: Revoke farmer identity
 */
router.post("/revoke", (0, requireRole_1.requireRole)("officer"), (req, res) => {
    const { aadhaar } = req.body;
    if (!aadhaar) {
        return res.status(400).json({ error: "Aadhaar is required" });
    }
    if (!db_1.aadhaarRegistry.has(aadhaar)) {
        return res.status(404).json({ error: "Farmer not found" });
    }
    revokedDb_1.revokedFarmers.add(aadhaar);
    return res.json({
        message: "Farmer identity revoked successfully",
        aadhaar
    });
});
exports.default = router;
