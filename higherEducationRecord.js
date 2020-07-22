exports.addHigherEducationDetails = function(connection, req) {
    var name = req.body.name
    var email = req.body.email;
    var university = req.body.university
    var location = req.body.location
    var branch = req.body.branch
    var course = req.body.course
    var graduatingYear = req.body.graduatingYear
    var values = [name, email, university, location, branch, course, graduatingYear]

    var queryString = "INSERT INTO alumnihighereducation(name, email, university, location, branch, course, graduatingYear) VALUES ?"

    connection.query(queryString, [[values]], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully added the higher education detail")
        }
    })
}