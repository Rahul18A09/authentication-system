const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const healthRoutes = require("./routes/health.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/health", healthRoutes);


// Other middleware...

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Authentication API is running"
    });
});

module.exports = app;