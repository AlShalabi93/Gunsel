
const express = require ("express") ;
const path = require("path");


const app = express() ;

const mongoose = require("mongoose") ;
mongoose.connect("mongodb://localhost:27017") 

.then (() => {

    console.log("connected to mongo or mangoose or whatever");


})

.catch((error) => {
    console.log("There is a problem connecting to MongoDB or Mongoose or whatever", error);
});
    


// Define a schema for your form data
const formDataSchema = new mongoose.Schema({
    username: String,
    password: String,
    
  });



  const textschema = new mongoose.Schema({
    textarea1: String,

  });
  const shalabinote = mongoose.model('shalabinote', textschema);

  // Create a model based on the schema
  const FormData = mongoose.model('FormData', formDataSchema);
  
  // Set up middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(__dirname));

  
  // Set up your HTML form
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
  });

  app.get('/edithtml', (req, res) => {
    res.sendFile(__dirname + '/edithtml.html');
  });
  
  

  
  // Handle form submissions
  app.post('/sending', async (req, res) => {
    const formData = req.body;
    
   
  
    // Create a new document using the FormData model
    const newFormData = new FormData(formData);
  
    try {
      // Save the document to MongoDB
      await newFormData.save();
      console.log('Form data saved to MongoDB');
      

      return res.redirect('/edithtml');

      
    } catch (error) {
      console.error(error);
       res.status(500).send('Internal Server Error');
    }
  });










  app.post('/saving', async (req, res) => {
    const shalabData = req.body;
  
    // Create a new document using the FormData model
    const newshalabi = new shalabinote (shalabData);
  
    try {
      // Save the document to MongoDB
      await newshalabi.save();
      console.log('Form data saved to MongoDB');
      

      return res.redirect('/');

      
    } catch (error) {
      console.error(error);
       res.status(500).send('Internal Server Error');
    }
  });















/*

// this is for testing

app.get("/new/:Username1/:Password1", (req,res) => {

    const un = req.params.Username1;
    const pd = req.params.Password1;
    console.log(req.params) ;

    res.send(`hello there: ${un} / ${pd}`);

  

    });
    


    app.get("/hellos", (req,res) => {

        //console.log (req.body.name);
        console.log (req.query);
        


    
        res.send(`hello there: write ur age : ${req.query.age}}`);
    
    
        });
        

    */

app.listen (4000, () => {

console.log ("iam listening in port 4000");

});













