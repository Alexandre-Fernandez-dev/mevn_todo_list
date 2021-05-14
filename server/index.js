const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
    .connect(config.database, { useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({ database_error: err });
    });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//configure body-parser ends here
app.use(morgan("dev")); // configure morgan
// define first route
app.get("/", (req, res) => {
    console.log("Hello MEVN Soldier");
});
const userRoutes = require("./api/user/route/user"); //bring in our user routes
app.use("/user", userRoutes);
const noteRoutes = require("./api/user/route/note");
app.use("/note", noteRoutes);

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});