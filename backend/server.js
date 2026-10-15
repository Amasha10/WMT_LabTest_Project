import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import dns from "dns";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

// Some networks (e.g. mobile hotspots) can't resolve the SRV records used by mongodb+srv URIs
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Resolve the cluster's host names through those servers too, falling back to the system resolver
const lookup = (hostname, options, callback) => {
  dns.resolve4(hostname, (error, addresses) => {
    if (error) return dns.lookup(hostname, options, callback);
    if (options.all) {
      return callback(null, addresses.map((address) => ({ address, family: 4 })));
    }
    callback(null, addresses[0], 4);
  });
};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { lookup })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });