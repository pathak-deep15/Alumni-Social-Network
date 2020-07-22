const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const session = require('express-session');
const collegeRecord = require(__dirname + "/collegeRecord.js");
const occupationRecord = require(__dirname + "/occupationRecord.js")
const higherEducationRecord = require(__dirname + "/higherEducationRecord.js")
const meetupRecord = require(__dirname + "/meetupRecord.js")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    dateStrings: true,
    database: 'alumni'
})

connection.connect(function(err) {
    if(err){
        console.log(err);
    } else{
        console.log("Connected");
    }
})

const testTable = "Create Table IF NOT EXISTS alumni (name VARCHAR(20), email VARCHAR(20), password VARCHAR(20))";
connection.query(testTable, function(err, result) {
    if(err) {
        console.log(err)
    }
    else{
        console.log("Table Created");
    }
})

const collegeTable = "Create Table IF NOT EXISTS iitbbsalumni (name VARCHAR(100), email VARCHAR(100), rollNumber VARCHAR(10), branch VARCHAR(50), course VARCHAR(50), graduatingYear VARCHAR(4) , cgpa VARCHAR(3))"
connection.query(collegeTable, function(err, result) {
    if(err) {
        console.log(err)
    } else{
        console.log("College Table Created");
    }
})

const occupationTable = "Create Table IF NOT EXISTS alumnioccupation (name VARCHAR(100), email VARCHAR(100), company VARCHAR(50), location VARCHAR(50), designation VARCHAR(20), joiningYear VARCHAR(4), currentlyWorking VARCHAR(3), salary INT)"
connection.query(occupationTable, function(err, result) {
    if(err) {
        console.log(err)
    } else{
        console.log("Occupation Table Created");
    }
})

const higherEducationTable = "Create Table IF NOT EXISTS alumnihighereducation (name VARCHAR(100), email VARCHAR(100), university VARCHAR(50), location VARCHAR(50), branch VARCHAR(50), course VARCHAR(50), graduatingYear VARCHAR(4))"
connection.query(higherEducationTable, function(err, result) {
    if(err) {
        console.log(err)
    } else{
        console.log("Higher Education Table Created");
    }
})
const meetupsTable = "Create Table IF NOT EXISTS meetups (name VARCHAR(100), email VARCHAR(100), contactNumber VARCHAR(10), date DATE, time TIME, place VARCHAR(20), batch VARCHAR(4), course VARCHAR(10), branch VARCHAR(50), purpose VARCHAR(100))"
connection.query(meetupsTable, function(err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Meetups Table Created")
    }
})

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/register", function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var cnfPassword = req.body.cnfPassword;
    var email = req.body.email;
    console.log(typeof(userName));
    if (password === cnfPassword) {
        var values = [[userName, email, password]];
        var queryStatement = "Insert INTO alumni (name, email, password) Values ?"
        connection.query(queryStatement, [values], function(err, result) {
            if(err) {
                console.log(err);
            } else{
                console.log("Successfully inserted " + result.affectedRows + "rows");
            }
        })
        res.render("login");
    } else{
        res.render("register");
    }
})

app.post("/login", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var queryStatement = "Select * from alumni where email = ? and password = ?"
    connection.query(queryStatement, [email, password], function(err, result, fields) {
        if (err) {
            console.log(err)
        } else{
            if(result.length > 0){
                req.session.loggedin = true
                req.session.username = result[0].name;
                res.render("dashboard", {name: result[0].name})
            } else{
                res.render("login");
                console.log("Wrong Credentials. Try again");
            }
        }
    })
})

app.get("/login", function(req, res) {
    res.render("login");
})

app.get("/dashboard", function(req, res) {
    res.render("dashboard", {name: req.body.name})
})

app.get("/college-details", function(req, res) {
    res.render("college-details")
})

app.get("/occupation-details", function(req, res) {
    res.render("occupation-details")
})

app.get("/higher-education", function(req, res) {
    res.render("higher-education")
})

app.get("/network", function(req, res) {
    res.render("network")
})

app.post("/college-details", function(req, res){
    collegeRecord.addCollegeDetails(connection, req)
    res.render("dashboard", {name: req.body.name});
})

app.post("/occupation-details", function(req, res) {
    occupationRecord.addOccupationDetails(connection, req)
    res.render("dashboard", {name: req.body.name})
})

app.post("/higher-education-details", function(req, res) {
    higherEducationRecord.addHigherEducationDetails(connection, req)
    res.render("dashboard", {name: req.body.name})
})

app.get("/find-iitbbs", function(req, res) {
    res.render("find-iitbbs")
})

app.get("/find-company", function(req, res) {
    res.render("find-company")
})

app.get("/find-high-education", function(req, res) {
    res.render("find-high-education")
})

app.get("/meetups", function(req, res) {
    res.render("meetups")
})

app.get("/organize-meetups", function(req, res) {
    res.render("organize-meetups")
})

app.get("/view-meetups", function(req, res) {
    var queryString = "SELECT * from meetups where date > SYSDATE()"
    connection.query(queryString, function(err, result) {
        if (err) {
            console.log(err)
        } else{
            res.render("view-meetups", {meetupsList: result})
        }
    })
})

app.post("/organize-meetups", function(req, res) {
    meetupRecord.addMeetupRecord(connection, req)
    res.render("dashboard", {name: req.body.name})
})


app.listen(3000, function() {
    console.log("App running on 3000");
})

