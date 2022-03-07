const express = require("express");
const app = express();

app.get("/books", logger, (req, res) => {
    return res.send({ route: "/books"});
});

app.get("/libraries", logger, checkPermission("librarian"), (req, res) => {
    return res.send({ route: "/libraries", permission: req.permission});
});

app.get("/authors", logger, checkPermission("author"), (req, res) => {
    return res.send({ route: "/authors", permission: req.permission});
});

function logger(req, res, next){
    console.log(req.path);
    next();
};

function checkPermission(role){
    return function checkPermission(req, res, next){
        if (req.path === "/libraries"){
            req.permission = true;
        } else if (req.path === "/authors"){
            req.permission = true;
        }
        next();
    };
}


app.listen(5000, () => {
    console.log("Listening to port 5000");
});