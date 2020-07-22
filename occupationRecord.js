exports.addOccupationDetails = function(connection, req) {
    var name = req.body.name
    var email = req.body.email
    var company = req.body.company
    var location = req.body.location
    var designation = req.body.designation
    var joiningYear = req.body.joiningYear
    var currentlyWorking = req.body.currentlyWorking
    var salary = req.body.salary
    var values = [name, email, company, location, designation, joiningYear, currentlyWorking, salary]

    var queryString = "INSERT INTO alumnioccupation(name, email, company, location, designation, joiningYear, currentlyWorking, salary) VALUES ?";

    var initialQuery = "UPDATE alumnioccupation SET currentlyWorking = 'No' where email = ?"
    connection.query(initialQuery, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log("Previous details updated")
            
        }
    })

    connection.query(queryString, [[values]], function(err, result) {
        if(err) {
            console.log(err)
        } else{
            console.log("Successfully updated the occupation details")
        }
    })
}