const express = require("express");
const app = express();
const cors = require("cors");

const adminRoutes = require("./api/admin");
const userRoutes = require("./api/user");
const publicRoutes = require("./api/public");

const getConfig = require("./config");
const { allowedOrigins } = getConfig();

app.use(express.json({ extended: false }));

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/public", publicRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
