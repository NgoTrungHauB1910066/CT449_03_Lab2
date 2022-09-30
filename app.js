const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", function (req, res) {
    res.json({ message: "welcome to contact book application"});
});
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((ApiError, req, res, next) => {
    return res.status(ApiError.statusCode || 500).json({ message: ApiError.message || "Internal Server Error",
    });
});

module.exports = app;