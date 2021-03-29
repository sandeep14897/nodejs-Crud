var mysql = require('msnodesqlv8');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var connection = "Server=LAPTOP-SJK1F4Q3\\MSSQLSERVER01;Database=EmployeeDB;Trusted_Connection=Yes;DRIVER={SQL Server Native Client 11.0}";
var corsOptions ={
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));


// Add users data to the db 
try{
    app.post('/newUser', function(req, res){
        console.log(req.body);
        console.log(req.body.username);
        var username = req.body.username;
        var phnNo = req.body.phnNo;
        var email = req.body.email;
        var password = req.body.password;
        var InsertQuery = "INSERT INTO dbo.UserData (username, password, email, phnno) \
        values ('"+username+"', '"+password+"', '"+email+"', '"+phnNo+"') COLLATE Latin1_General_CS_AS";
        console.log(InsertQuery);
            mysql.query(connection, InsertQuery, (err, result)=>{
            console.log(result);
            res.send({data: result});
            })
        });
    }
catch(err){
    console.error(err.message);
}

    
// Fetch users data from db 
    app.post('/Users', (req, res) => { 
        console.log(req.body);
        var username=req.body.username;
        var password=req.body.password;
        var selectQuery = "SELECT * FROM dbo.UserData WHERE username='"+username+"'COLLATE SQL_Latin1_General_CP1_CS_AS AND password='"+password+"' COLLATE Latin1_General_CS_AS";   
        //var selectQuery = "SELECT * FROM dbo.UserData";
        mysql.query(connection, selectQuery, function(err, result){
        console.log(result);
        res.send({data: result});
    })
});


//forgot user credentials
    app.post('/forgot', (req, res) => { 
        console.log(req.body);
        var email=req.body.email;
        var phnNo=req.body.phnNo;
        var selectQuery = "SELECT password FROM dbo.UserData WHERE lower(email)='"+email+"' AND phnno='"+phnNo+"'";   
        mysql.query(connection, selectQuery, function(err, result){
        console.log(result);
        res.send({data: result});
    })
});

app.listen(3000);
