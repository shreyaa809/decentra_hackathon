"use strict";
// Mock government registries (in-memory)
Object.defineProperty(exports, "__esModule", { value: true });
exports.didRegistry = exports.aadhaarRegistry = void 0;
// Aadhaar → DID mapping
exports.aadhaarRegistry = new Map();
// DID → Aadhaar mapping
exports.didRegistry = new Map();
