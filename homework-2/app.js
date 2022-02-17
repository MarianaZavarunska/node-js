const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

app.use(express.json()); // take files with extension json
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "static"))); // which folder is static, show path

app.set("view engine", ".hbs"); // use .hbs as engine for templates

app.engine(".hbs", engine({ defaultLayout: false })); // if see .hbs -> use engine with settings(without tree structure folders)

app.set("views", path.join(__dirname, "static", "hbs")); // where all hbs

const users = [
    {
        firstName: "Monica",
        lastName: "Geller",
        email: "monica@example.com",
        password: "123mm",
        age: "29",
        city: "New York",
    },
    {
        firstName: "Joey",
        lastName: "Tribiani",
        email: "joey@example.com",
        password: "1234",
        age: "31",
        city: "Chicago",
    },
    {
        firstName: "Rachel",
        lastName: "Green",
        email: "rachel@example.com",
        password: "123rr",
        age: "30",
        city: "New York",
    },
    {
        firstName: "Phoebe",
        lastName: "Buffay",
        email: "phoebe@example.com",
        password: "princessConsuela",
        age: "31",
        city: "Chicago",
    },
    {
        firstName: "Chandler",
        lastName: "Bing",
        email: "chandler@example.com",
        password: "123cc",
        age: "29",
        city: "LA",
    },
    {
        firstName: "Ross",
        lastName: "Geller",
        email: "ross@example.com",
        password: "123rr",
        age: "30",
        city: "San Diego",
    },
    {
        firstName: "Gunther",
        lastName: "Geller",
        email: "gunther@example.com",
        password: "123gg",
        age: "28",
        city: "San Diego",
    },
];
app.get("/", (req, res) => {
    res.render("home");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/users", (req, res) => {
    res.render("users", { users });
});
app.get("/errEmail", (req, res) => {
    res.render("errEmail");
});

app.post("/login", (req, res) => {

    let index = users.findIndex(
        (user) => user.email === req.body.email.toLowerCase()
    );

    index === -1
        ? users.push(req.body) && res.redirect("/users")
        : res.redirect("/errEmail");
});

app.post("/users", (req, res) => {
    console.log(req.body);

    let filteredUsers = users;

    if (req.body.ageFilter) {
        filteredUsers = filteredUsers.filter(user => user.age === req.body.ageFilter);
    }
    if (req.body.cityFilter) {
        filteredUsers = filteredUsers.filter(user => user.city.toLowerCase() === req.body.cityFilter.toLowerCase());
    }
    res.render("users", { users: filteredUsers, ageFilter: req.body.ageFilter, cityFilter: req.body.cityFilter });

})

app.use((_, res) => {
    res.render("notFoundPage");
});
app.listen(5100, () => {
    console.log("Server 5100 has started");
});

// декілька ендпоінтів зробити

// 1. /login
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж

// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city і (мульти філтер)

// 3. /user/:id сторінка з інфою про одного юзера

// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект
