const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

app.use(express.urlencoded({extended:true})); //middleware that parses incoming urlencoded requests.
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
    id:uuidv4(),
    username:"Manan Jain",
    content:"Good in Maths",
   },
   {
    id:uuidv4(),
    username:"Lakhya Gupta",
    content:"Good At Fitness",
   },
   {
    id:uuidv4(),
    username:"Sarthak Gupta",
    content:"Good in Painting",
   }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    posts.push({username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let Newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=Newcontent;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id !==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening requests on port 8080");
});
