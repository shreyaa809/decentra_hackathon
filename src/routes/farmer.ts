import { Router } from "express";
import { aadhaarRegistry, didRegistry } from "../db";


import { revokedFarmers } from "./revokedDb";
import { requireRole } from "../middleware/requireRole";


const router = Router();

/**
 * OFFICER ONLY: Onboard farmer
 */
router.post(
  "/onboard",
  requireRole("officer"),
  (req, res) => {
    const { aadhaar } = req.body;

    if (!aadhaar) {
      return res.status(400).json({ error: "Aadhaar required" });
    }

    if (revokedFarmers.has(aadhaar)) {
      return res.status(403).json({
        error: "Revoked farmer cannot be re-onboarded"
      });
    }

    if (aadhaarRegistry.has(aadhaar)) {
      return res.status(409).json({
        error: "Aadhaar already linked to a DID"
      });
    }

    const did = `did:ethr:sepolia:${Math.random()
      .toString(16)
      .slice(2, 10)}`;

    aadhaarRegistry.set(aadhaar, did);
    didRegistry.set(did, aadhaar);

    return res.json({
      message: "Farmer onboarded successfully",
      did
    });
  }
);

/**
 * OFFICER ONLY: Revoke farmer identity
 */
router.post(
  "/revoke",
  requireRole("officer"),
  (req, res) => {
    const { aadhaar } = req.body;

    if (!aadhaar) {
      return res.status(400).json({ error: "Aadhaar is required" });
    }

    if (!aadhaarRegistry.has(aadhaar)) {
      return res.status(404).json({ error: "Farmer not found" });
    }

    revokedFarmers.add(aadhaar);

    return res.json({
      message: "Farmer identity revoked successfully",
      aadhaar
    });
  }
);

export default router;
