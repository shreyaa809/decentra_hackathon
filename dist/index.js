"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmer_1 = __importDefault(require("./routes/farmer"));
const land_1 = __importDefault(require("./routes/land"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/farmer", farmer_1.default);
app.use("/land", land_1.default);
app.get("/", (req, res) => {
    res.send("Farmer Identity Backend is running");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
