exports.addMeetupRecord = function(connection, req) {
    var name = req.body.name
    var email = req.body.email
    var contactNumber = req.body.contactNumber
    var date = req.body.date
    var time = req.body.time
    var place = req.body.place
    var batch = req.body.batch
    var course = req.body.course
    var branch = req.body.branch
    var purpose = req.body.purpose
    var values = [name, email, contactNumber, date, time, place, batch, course, branch, purpose]
    var queryString = "INSERT INTO meetups(name, email, contactNumber, date, time, place, batch, course, branch, purpose) VALUES ?"
    connection.query(queryString, [[values]], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully added the meetup");
        }
    })
}