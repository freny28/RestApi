/*

StAuth10065: Freny Patel, 000744054 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

*/

var express = require('express');
var app = express();
const http = require('http');
const hostname = 'localhost';
const port = 3000;"
var sqlite3 = require("sqlite3").verbose();
var file = "api.db";
var db = new sqlite3.Database(file);
app.use(express.json());

db.serialize(function(){
	var del = db.prepare("DROP TABLE IF EXISTS users");
	del.run();
	del.finalize();
	db.run("CREATE TABLE IF NOT EXISTS users(msgid INTEGER PRIMARY KEY AUTOINCREMENT,status TEXT,message TEXT, timestamp TEXT)");
	console.log('Table Created');
	
});

//get the entire collection
app.get('/api',function(req,res,next){
	console.log("Get Requesting..")
	var sql = "Select * From users";
	var params = [];
	db.all(sql,params,(error,rows) => {
		if(error){
			res.status(400).json({"error:" : error.message});
			return;
		}
		res.json({
			"data": rows
		})
	});
	
});

//get the entry in the collection with the supplied id
app.get('/api/:id', function(req,res,next){
	console.log("Get with id Requesting..");
	var sql = "Select * From users Where rowid=?";
	var params = [req.params.id];
	db.all(sql,params, (error,row) => {
		if(error){
			res.status(400).json({"error": error.message});
			return;			
		}
		res.json({
			"data": row
		})
		
	});
	
});

// Add the new item to collection
app.post('/api',function(req,res,next){
	console.log("Post Requesting...");
	var data = {
		status: req.body.status,
		message: req.body.message	
	}
	var stmt = "INSERT INTO users VALUES(?,?,?,datetime('now'))";
	var params = [null,data.status, data.message];
	console.log(params);
	//console.log(data.status);
	db.run(stmt, params, function(error,result){
		if(error){
			res.status(400).json({"error": error.message});
			return;
		}
		res.json({
			"message":"CREATE ENTRY SUCCESSFUL"		
		});
		
	});

});


app.put('/api',function(req,res,next){
	db.serialize(function(){
		db.run("DELETE FROM users");
		var stmt = "INSERT INTO users VALUES(?,?,?,datetime('now'))";
		for(var i = 0; i < Object.keys(req.body.usersdata).length; i++){
			if(i==Object.keys(req.body.usersdata).length -1){
				db.run(stmt,[null,req.body.usersdata[i].status,req.body.usersdata[i].message], 
				function(error,result){
					if(error){
						res.status(400).json({"error": error.message});
						return;
					}
					res.json({
						"message":"REPLACE COLLECTION SUCCESSFUL",
					});
				});
			}else{
				db.run(stmt,[null,req.body.usersdata[i].status,req.body.usersdata[i].message], 
				function(error,result){
					if(error){
						res.status(400).json({"error": error.message});
						return;
					}
				});
				
			}
		}
		
	});	
});

//Update the item with updated values for the item with supplied id
app.put('/api/:id',function(req,res,next){
	console.log("Put with id Requesting...");
	var data = {
		status: req.body.status,
		message: req.body.message,
		id: req.params.id
	}
	var stmt = "UPDATE users SET status=?, message=? WHERE rowid=?";
	var params = [data.status,data.message,data.id];
	console.log(params);
	db.run(stmt,params,function(error,result){
		if(error){
			res.status(400).json({"error": error.message});
			return;
		}
		res.json({
			message:"UPDATE ITEM SUCCESSFUL"
		});
	})
});

//Delete the entire collection
app.delete('/api', function(req,res,next){
	console.log("Delete Requesting...");
	db.run("DELETE FROM users",function(error,result){
		if(error){
				res.status(400).json({"error": res.message})
				return;
			}
			res.json({"message": "DELETE COLLECTION SUCCESSFUL"});
	});
	
})

//Delete the item with the supplied id
app.delete('/api/:id', function(req,res,next){
	console.log("Delete with id Requesting...");
	var stmt = "DELETE FROM users WHERE msgid = ?";
	var id = req.params.id;
	db.run(stmt,id, function(error,result){
			if(error){
				res.status(400).json({"error": res.message})
				return;
			}
			res.json({"message": "DELETE ITEM SUCCESSFUL"});
	});
})



var server = app.listen(port,hostname,function(){
	console.log('server listening...');
});
