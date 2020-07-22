exports.addCollegeDetails = function(connection, req) {
    var name = req.body.name
    var email = req.body.email;
    var rollNumber = req.body.rollNumber
    var branch = req.body.branch
    var course = req.body.course
    var graduatingYear = req.body.graduatingYear
    var cgpa = req.body.cgpa
    var values = [name, email, rollNumber, branch, course, graduatingYear, cgpa]
    var initialQuery = "Select * from iitbbsalumni where email = ?";
    connection.query(initialQuery, [email], function(err, results, fields) {
        if (err) {
            console.log(err);
        } else{
            if(results.length === 0) {
                finalQuery = "Insert INTO iitbbsalumni(name, email, rollNumber, branch, course, graduatingYear, cgpa) VALUES ?"
                connection.query(finalQuery, [[values]], function(err, results, fields) {
                    if (err) {
                        console.log(err);
                    } else{
                        console.log("successfully added the details");
                    }
                })
            } else {
                deleteQuery = "Delete from iitbbsalumni where email = ?";
                connection.query(deleteQuery, [email], function(err, result, fields) {
                    if(err) {
                        console.log(err)
                    } else{
                        finalQuery = "Insert INTO iitbbsalumni(name, email, rollNumber, branch, course, graduatingYear, cgpa) VALUES ?"
                        connection.query(finalQuery, [[values]], function(err, results, fields) {
                        if (err) {
                            console.log(err);
                        } else{
                            console.log("successfully updated the details");
                        }
                        })
                    }
                })
            }
        }
    })

}