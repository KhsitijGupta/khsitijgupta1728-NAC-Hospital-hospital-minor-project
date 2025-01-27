const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require('method-override')
const Doctor = require("./database/models/doctors")
const Feadback = require("./database/models/feadback")
const Appointment = require("./database/models/appo")
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")

//for delete and put request
app.use(methodOverride("_method"))
// ejs(html) file linking
app.set("views", path.join(__dirname, "views"))
app.set("views engine", "ejs")
//ejs mate
app.engine("ejs", ejsMate)
// css file linking
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

//Mongoose connectioin

main()
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

async function main() {
    await mongoose.connect("mongodb+srv://samcollegeplac:fVrT5vpqO8SL1OwT@cluster0.0r0ow.mongodb.net/")
}



app.get("/", (req, res) => {
    res.render("index.ejs")
})
app.get("/doctors", async (req, res) => {
    const alldoctors = await Doctor.find({});
    res.render("subpages/doctors.ejs", { alldoctors })
})

app.get("/appoinment_form", (req, res) => {
    res.render("subpages/appo.ejs")
})
app.post("/appoinment_form",(req,res)=>{
    let newdata=req.body;
    const newAppointment = new Appointment({
        name:newdata.name ,
        email:newdata.email,
        phone:newdata.phone,
        preferredDate: newdata.date,
        comments: newdata.comments,
      });
      
      newAppointment.save()
        .then(() => {
          console.log('Appointment saved successfully');
          mongoose.connection.close();
        })
        .catch((err)=> {
            console.log('Error saving appointment:');
            console.log(err)
            mongoose.connection.close();
        });
        res.redirect("/appointed")
})
app.get("/appointed", (req, res) => {
    res.render("subpages/appointed.ejs")
})
app.get("/services", (req, res) => {
    res.render("subpages/services.ejs")
})
app.get("/contact_us", (req, res) => {
    res.render("subpages/contactus.ejs")
})
app.post("/contact_us", (req, res) => {
    let newdata=req.body
    const newfeadback = new Feadback({
        name:newdata.name ,
        email:newdata.email,
        phone:newdata.phone,
        description: newdata.description,
      });
      
      newfeadback.save()
        .then(() => {
          console.log('Feadback saved successfully');
          mongoose.connection.close();
        })
        .catch((err)=> {
            console.log('Error saving appointment:');
            console.log(err)
            mongoose.connection.close();
        });
        res.redirect("/contact_us")
})
app.get("/about_us", (req, res) => {
    res.render("subpages/about.ejs")
})
app.get("/docview/:id",async(req,res)=>{
    let {id} =req.params
    // console.log(id)
    let doctor = await Doctor.findById(id)
    res.render("subpages/docview.ejs",{doctor})
})
// app.get("/docview", (req, res) => {
//     res.render("subpages/docview.ejs")
// })
const port = 3000;
app.listen(port, () => {
    console.log("app is listening on 3000")
})
