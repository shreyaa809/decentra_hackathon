"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/onboard", (req, res) => {
    const { aadhaar } = req.body;
    if (!aadhaar) {
        return res.status(400).json({ error: "Aadhaar required" });
    }
    if (db_1.aadhaarRegistry.has(aadhaar)) {
        return res
            .status(409)
            .json({ error: "Aadhaar already linked to a DID" });
    }
    const did = `did:ethr:sepolia:${Math.random().toString(16).slice(2, 10)}`;
    db_1.aadhaarRegistry.set(aadhaar, did);
    db_1.didRegistry.set(did, aadhaar);
    res.json({
        message: "Farmer onboarded successfully",
        did
    });
});
exports.default = router;
