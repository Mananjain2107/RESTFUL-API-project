const express=require("express");
const app=express();
const port=8080;
const path=require("path");

app.use(express.urlencoded({extended:true})); //middleware that parses incoming urlencoded requests.

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
    username:"Manan Jain",
    content:"Good in Maths",
   },
   {
    username:"Lakhya Gupta",
    content:"Good At Fitness",
   },
   {
    username:"Sarthak Gupta",
    content:"Good in Painting",
   }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
});
app.listen(port,()=>{
    console.log("listening requests on port 8080");
});