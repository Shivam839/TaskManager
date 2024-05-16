const exp = require("constants")
const express = require("express")
const path = require("path")
const fs = require("fs")
const { title } = require("process")
const { log } = require("console")
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.set("view engine",'ejs' )

app.get("/", (req,res)=>{
    fs.readdir("./files", (err,files)=>{
        res.render("index" , {files:files})
        // console.log(files);
    })
})

app.get("/files/:filename", (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8", (err,filedata)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Error reading the file.");
        } else {
            // console.log(filedata);
            res.render('show',{filename:req.params.filename, filedata:filedata}); // Sending file data back as response
        }
    })
})
app.get("/edit/:filename", (req,res)=>{
    res.render("edit", {filename:req.params.filename})

})

app.post("/create",(req,res)=>{
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err)=>{
    console.log(err);
    res.redirect("/")
  })
    // console.log(req.body);
})
app.post("/edited",(req,res)=>{
    // fs.rename("req.")
    //   console.log(req.body);
      fs.rename(`./files/${req.body.prevtitle}`, `./files/${req.body.newtitle}`, (err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/")
      })

  })


app.listen(3000,()=>{
    console.log("Page has been ported at 3000");
})