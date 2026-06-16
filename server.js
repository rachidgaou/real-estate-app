const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT || 8000;

////////
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
})
const Contact = mongoose.model("Contact", contactSchema)


const express = require('express')
const cors = require ('cors')
const app = express()

app.use(express.json())
app.use(cors())

/////////////////////////////////////////
app.get ('/', (req,res)=>{
    res.send("your server is working")
})
/////////////////////////////
app.get ('/contact', async (req,res)=>{
   try{
    const contacts = await Contact.find();
    res.json(contacts)
   }
   catch (err){res.status(500).json({error:err.message})}
})
///////////////////
app.get ('/AddProperties', async (req,res)=>{
    try{
        const properties = await Property.find();
        res.json(properties)
    }catch (err){ res.status (500).json ({error:err.message})}
    
})
///////////////////////////////////
app.post ('/contact', async (req, res)=>{
    try {
        const newContact = await Contact.create(req.body)
        res.json(newContact)
    } catch (err){res.status(500).json({error: err.message}) }
 
})
//////
app.post ('/AddProperties', async (req, res)=>{
    try{
    const newProperty =await  Property.create(req.body)
    res.json(newProperty)}
    catch(err){
        res.status(500).json({error: err.message})
    }
})

//////////////////////////delete:::::::::::::::::::::::::
app.delete('/contact/:id', async (req,res)=>{
    try{
        const deleted = await  Contact.findByIdAndDelete(req.params.id)
        res.json(deleted)
    } catch (err){ res.status(500).json({error: err.message})
    }
})
//////
app.delete('/AddProperties/:id', async (req, res) => {
    try {
        const deleted = await Property.findByIdAndDelete(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

///////////////////////////////
app.put ('/contact/:id', async (req,res)=>{
    try{
    const updated = await  Contact.findByIdAndUpdate(req.params.id,
        req.body,{new:true}
         )
         res.json(updated)}
         catch
            (err) {res.status(500).json({error:err.message})}
         

})
//////////


app.put('/AddProperties/:id', async (req,res)=>{
    try {
        const updated = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))
const propertySchema = new mongoose.Schema({
    name: String,
    img: String,
    price: String
});
const Property = mongoose.model("Property", propertySchema);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});
