import { Router } from "express";
import { aadhaarRegistry, didRegistry } from "../db";

const router = Router();

router.post("/onboard", (req, res) => {
  const { aadhaar } = req.body;

  if (!aadhaar) {
    return res.status(400).json({ error: "Aadhaar required" });
  }

  if (aadhaarRegistry.has(aadhaar)) {
    return res
      .status(409)
      .json({ error: "Aadhaar already linked to a DID" });
  }

  const did = `did:ethr:sepolia:${Math.random().toString(16).slice(2, 10)}`;

  aadhaarRegistry.set(aadhaar, did);
  didRegistry.set(did, aadhaar);

  res.json({
    message: "Farmer onboarded successfully",
    did
  });
});

export default router;
