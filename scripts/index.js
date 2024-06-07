"use strict"

window.onload = () => {
    // [ make sure we are working ]
    console.log("muahahah! I'm in your console! from index.js >:3");

    populateTable();

}

async function populateTable() {

    // [ get the courses from the API ]
    let courses = await getCourses();

    // [ get a hold of the table where the data is going to go ]
    let tbody = document.querySelector("#courseTableBody");

    // [ loop over all the courses and work with a single course ]
    courses.forEach((course) => {
        // [ call the function to build the row ]
        // [ pass it where the row goes (tbody) ]
        // [ pass it where what goes in the row (data/course) ]
        buildRow(tbody, course)
    })

}

// [ the function that takes a table body and some data and puts the data in the tabel body ]
function buildRow(someTableBody, someData) {

    // [ create the row for the table ]
    let row = someTableBody.insertRow();

    // [ create the cell for the department ]
    let departmentCell = row.insertCell();
    // [ put the relevent course data in the ]
    departmentCell.innerHTML = someData.dept;

    // [ create the cell for the course number ]
    let courseNumberCell = row.insertCell();
    // [ put the relevent course data in the ]
    courseNumberCell.innerHTML = someData.courseNum;

    // [ create the cell for the course name ]
    let courseNameCell = row.insertCell();
    // [ put the relevent course data in the ]
    courseNameCell.innerHTML = someData.courseName;

    // [ create the cell for the course name ]
    let courseDetailsCell = row.insertCell();
    // [ put the relevent course data in the ]
    courseDetailsCell.innerHTML = `
        <a href="./details.html?courseid=${someData.id}">Show Details</a>
        `;

}

async function getCourses() {

    // [ the try says try these things and if it doesn't work out, fall into the catch --
    // and deal with the error ]
    try {
        // [ make the API call to get all the courses ]
        let response = await fetch("http://localhost:8081/api/courses");
        let courses = await response.json();

        return courses;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}