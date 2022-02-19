const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const apiRoutes = require("./routes/api.routers");

const app = express();

//default 
app.use(express.json()); // take files with extension json
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); // which folder is static, show path

//engine
app.set("view engine", ".hbs"); // use .hbs as engine for templates
app.engine(".hbs", engine({ defaultLayout: false })); // if see .hbs -> use engine with settings(without tree structure folders)
app.set("views", path.join(__dirname, "static", "hbs")); // where all hbs

//routes
app.use(apiRoutes);

app.listen(5100, () => {
    console.log("Server 5100 has started");
});


