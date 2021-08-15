var express=require("express");
var bodyParser=require("body-parser");
var nodemailer = require('nodemailer');
var app=express();
const { Auth } = require("two-step-auth");
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// database starts
  
var dbo;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongodb:mongodb@cluster0.2jqvy.mongodb.net/mydb?retryWrites=true&w=majority"; //cloud mongo id
MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
 
 if (err) throw err;
  
  dbo = db.db("mydb");
  
  dbo.createCollection("donor", function(err, res) {
    if (err)
	{}
   else {console.log("Collection created!");}
    
  });
  dbo.createCollection("reciever", function(err, res) {
    if (err) {}
    else {console.log("Collection created!");}
	
  });
	
	
	 dbo.createCollection("donor_id", function(err, res) {
    if (err) {}
    else {console.log("Collection created!");}
	
	
    
  });
  
  
});
//database ends


  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  

app.post('/sign_up', function(req,res){
 

 var name=(req.body.fname);
 var age=(req.body.age);
var mob=(req.body.mob);
var gender=(req.body.gender);
var positive=(req.body.positive);
var negative=(req.body.negative);
var blood=(req.body.blood);
var mail=req.body.mail;
var state=req.body.state;
var district=req.body.district;
	



     var data = {
        "name": name,
        "age":age,
        "mob":mob,
        "gender":gender,
		"positive":positive,
		"negative":negative,
		"blood":blood,
		"mail":mail,
		"state":state,
		"district":district
		
    }
	dbo.collection('donor').insertOne(data,function(err){
        if (err) throw err;
        console.log("Record inserted Successfully");
		
    });
	 
	
	    res.redirect("/next.html");
			
			
    });
	
		

app.post('/login', function(req,res){
	
	var name=req.body.name;
	var mob=req.body.mob;
	
  

	
	var query = { "name":name,
					"mob":mob
				};
				
				 dbo.collection("donor").find(query).toArray(function(err, result) {
					if (err) throw err;
					
					
					res.send(result);
				  });
				  
				  
	
});
  
  app.post('/find', function(req,res){
	
	var state=req.body.state;
	var district=req.body.district;
	
  

	
	var query = { "state":state,
					"district":district
				};
				
				 dbo.collection("donor").find(query).toArray(function(err, result) {
					if (err) throw err;
					
					
					res.send(result);
				  });
				  
				  
	
});
  
  
app.get('/',function(req,res){ 
res.set({
    'Access-control-Allow-Origin': '*'
    });

}).listen(8081);
  
  
console.log("server listening at port 8081");