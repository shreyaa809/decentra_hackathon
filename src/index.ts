import express from "express";
import farmerRoutes from "./routes/farmer";

import landRoutes from "./routes/land";



const app = express();
app.use(express.json());

app.use("/farmer", farmerRoutes);
app.use("/land", landRoutes);

app.get("/", (req, res) => {
  res.send("Farmer Identity Backend is running");
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


