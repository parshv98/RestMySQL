// Import required modules

// For generating random fake data
const { faker } = require('@faker-js/faker');

// MySQL driver to connect Node.js with MySQL database
const mysql = require('mysql2'); 

// Express framework for routing and server setup
const express = require('express'); 

// Initialize express app
const app = express(); 

// Node.js module for handling file and directory paths
const path = require("path"); 

// To support PUT & DELETE methods using POST forms
const methodOverride = require("method-override"); 

// For generating unique IDs (UUID v4)
const {v4:uuidv4}=require("uuid"); 

// **Middleware setup**

// Enables use of "_method" query param for method override
app.use(methodOverride("_method")); 

// Set EJS as templating engine
app.set("view engine","ejs"); 

// Define "views" folder location
app.set("views",path.join(__dirname,"views"));

 // Parse URL-encoded data (form submissions)
app.use(express.urlencoded({extended:true}));

// Parse JSON data in requests
app.use(express.json()); 

// MySQL Database connection setup
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'omega',
    password:'parshva@#123'
});

// Function to generate random user using Faker library
let getRandomUser = ()=> {
  return [
     faker.string.uuid(),
     faker.internet.username(),
     faker.internet.email(),
     faker.internet.password(),
  ];
}

// ======================= ROUTES ============================

// Home Route - Display total user count from DB
app.get("/",(req,res)=>{
  try{
    let q = `SELECT COUNT(*) FROM user`;
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let count = result[0]["COUNT(*)"];

      // Render home page and pass user count
      res.render("home.ejs",{count}); 

      console.log(result[0]["COUNT(*)"]);
    });
  }
  catch(err){
    console.log(err);
    res.send("Error in DB");
  }
});

// Route to display all users
app.get("/user",(req,res)=>{
    let q = `SELECT * FROM user`;
    try{
      connection.query(q,(err,users)=>{
        if(err) throw err;

        // Render EJS page with all users
        res.render("showusers.ejs",{users});
      });
    }
    catch(err){
      console.log("error");
      res.send("Error in DB");
    }
});

// Route to display Edit form for a user by ID
app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];

      // Render edit page with selected user details
      res.render("edit.ejs",{user}); 
    });
  }
  catch(err){
    console.log(err);
  }
});

// Update user route (PATCH request)
app.patch("/user/:id",(req,res)=>{
  let {id} = req.params;
  let {username:newUsername,password:newpassword} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];

      // Check password before allowing update
      if(newpassword!=user.password){
        res.send("Wrong Password");
      }      
      else{
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err)throw err;

          // Redirect to user list page after update
          res.redirect('/user'); 
        })
      }
    })
  }
  catch(err){
    console.log(err);
    res.send("something went wrong");
  }
});

// Route to show delete confirmation page
app.get("/user/:id/delete",(req,res)=>{
  let {id}=req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];

      // Render delete confirmation page
      res.render("delete.ejs",{user}); 
    });
  }
  catch(err){
    console.log(err);
  }
});

// Route to handle delete request (DELETE method)
app.delete("/user/:id",(req,res)=>{
  let { id } = req.params;
  let {password:newPassword} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];

      // Check password before deleting
      if(newPassword!=user.password){
        res.send("Wrong Password");
      }      
      else{
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err)throw err;

          // Redirect to user list after deletion
          res.redirect('/user'); 
        })
      }
    })
  }catch(err){
    console.log(err);
    res.send("Something went wrong");
  }
});

// Route to show form for creating new user
app.get("/newuser",(req,res)=>{

    // Render new user form page
    res.render("newuser.ejs"); 
});

// Route to insert new user into DB
app.post("/user",(req,res)=>{

  // Generate unique ID for new user
  let id = uuidv4(); 
  let {username:newUsername,password:newPassword,email:newEmail} = req.body;
  let q = `INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)`;
  let user = [id,newUsername,newEmail,newPassword];

  try{
    connection.query(q,user,(err,result)=>{
      if(err) throw err;

      // Redirect to user list after successful insert
      res.redirect("/user"); 
    })
  }catch(err){
    res.send("something went wrong");
  }
});

// Start the server on port 8080
app.listen(8080,()=>{
  console.log("listen port number 8080");
});
