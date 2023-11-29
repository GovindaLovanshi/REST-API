const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // create a uniqe id randam
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("view", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [{
        id: uuidv4(),
        username: "govinda",
        content: "I Love Coding"
    },
    {
        id: uuidv4(),
        username: "krishna",
        content: "this is is a God"
    },
    {
        id: uuidv4(),
        username: "Shyam",
        content: "hbjdbdbn"
    }
];

app.get("/posts", (req, res) => {
    res.send("index.ejs,{posts}");
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => { // ipdate
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});

app.listen(port, () => {
    console.log("listening to port : 8080");
});