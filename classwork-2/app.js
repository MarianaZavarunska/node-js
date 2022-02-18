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
        id: 11,
        firstName: "Monica",
        lastName: "Geller",
        email: "monica@example.com",
        password: "123mm",
        age: "29",
        city: "New York",
    },
    {
        id: 22,
        firstName: "Joey",
        lastName: "Tribiani",
        email: "joey@example.com",
        password: "1111",
        age: "31",
        city: "Chicago",
    },
    {
        id: 33,
        firstName: "Rachel",
        lastName: "Green",
        email: "rachel@example.com",
        password: "123rr",
        age: "30",
        city: "New York",
    },
    {
        id: 44,
        firstName: "Phoebe",
        lastName: "Buffay",
        email: "phoebe@example.com",
        password: "princessConsuela",
        age: "31",
        city: "Chicago",
    },
    {
        id: 55,
        firstName: "Chandler",
        lastName: "Bing",
        email: "chandler@example.com",
        password: "123cc",
        age: "29",
        city: "LA",
    },
    {
        id: 66,
        firstName: "Ross",
        lastName: "Geller",
        email: "ross@example.com",
        password: "123rr",
        age: "30",
        city: "San Diego",
    },
    {
        id: 77,
        firstName: "Gunther",
        lastName: "Geller",
        email: "gunther@example.com",
        password: "123gg",
        age: "28",
        city: "San Diego",
    },
];
app.get("/", (_, res) => {
    res.render("home");
});
app.get("/login", (_, res) => {
    res.render("login");
});

app.get("/users", (_, res) => {
    res.render("users", { users });
});
app.get("/errEmail", (_, res) => {
    res.render("errEmail");
});

app.get("/users/:userId", (req, res) => {
    // console.log(req.params);
    const { userId } = req.params;
    let index = users.findIndex((user) => user.id === +userId);

    res.render("userDetails", { user: users[index] });
})

//classwork 

app.get("/signIn", (_, res) => {
    res.render("signIn");
})

app.post("/deleteUser/:userId", (req, res) => {
    const { userId } = req.params;

    let index = users.findIndex(user => user.id === Number(userId));
    users.splice(index, 1);
    res.redirect("/users")
})

app.post("/signIn", (req, res) => {
    let index = users.findIndex(
        (user) =>

            user.email === req.body.email.toLowerCase()
            && user.password === req.body.password.toLowerCase()
    );
    index !== -1
        ? res.render("userDetails", { user: users[index] })
        : res.send("Your email or password is invalid!")
})

//

app.post("/login", (req, res) => {

    let index = users.findIndex(
        (user) => user.email === req.body.email.toLowerCase()
    );

    if (index === -1) {
        req.body['id'] = new Date().getTime();
        users.push(req.body);
        res.redirect("/users");
    } else {
        res.redirect("/errEmail");
    }
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
    res.render("users", { 'users': filteredUsers, 'ageFilter': req.body.ageFilter, 'cityFilter': req.body.cityFilter });

})

app.use((_, res) => {
    res.render("notFoundPage");
});
app.listen(5100, () => {
    console.log("Server 5100 has started");
});


