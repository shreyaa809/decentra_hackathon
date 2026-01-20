import { Router } from "express";
import { landRegistry } from "../landDb";
import { aadhaarRegistry } from "../db";
import { revokedFarmers } from "./revokedDb";
import { requireRole } from "../middleware/requireRole";

const router = Router();

router.post(
  "/verify",
  requireRole("officer"),
  (req, res) => {
    const { aadhaar, khasraNo, approvedByTehsildar } = req.body;

    if (!aadhaar || !khasraNo) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (!aadhaarRegistry.has(aadhaar)) {
      return res.status(404).json({ error: "Farmer not onboarded" });
    }

    if (revokedFarmers.has(aadhaar)) {
      return res.status(403).json({
        error: "Farmer identity revoked. Land verification blocked."
      });
    }

    const owner = landRegistry.get(khasraNo);
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
  }
);

export default router;
