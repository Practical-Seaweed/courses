"use strict"

window.onload = () => {

    console.log("heh, I'm inside the details.js >:3")

    // [ this allows us to get the urlParams to get the variables in the url ]
    const urlParams = new URLSearchParams(location.search);

    // [ we can access the individual params ]
    console.log(urlParams.get("courseid"))


    if (urlParams.has("courseid")) {

        // [ if we have a course id, display it's details ]
        displayCourseDetails(urlParams.get("courseid"));

    } else {
        // [ let them know we didn't have a valid course id and send them back --
        //  to the courses  ]
        alert("no valid course id");
        window.location.href = "./index.html";
    }

}

async function displayCourseDetails(courseId) {

    // [ get the course details ]
    let courseDetails = await getCourseDetails(courseId);

    console.log(courseDetails);

    // [ get the div where we want to put the details for the course ]
    let courseDetailsDiv = document.querySelector("#courseDetails");

    // [ JSON stringify the output becasuse I am lazy and put in the div ]
    courseDetailsDiv.innerHTML = `
        <div>courseId: ${courseDetails.id}</div>
        <div>courseName: ${courseDetails.courseName}</div>
        <div>instructor: ${courseDetails.instructor}</div>
        <div>numDays: ${courseDetails.numDays}</div>
    `

}

async function getCourseDetails(courseId) {

    try {
        // [ use fetch to get the details for the specific course ]
        let response = await fetch("http://localhost:8081/api/courses/" + courseId);
        // [ deal with the response to get the data ]
        let data = response.json();

        // [ hand the data back ]
        return data;
    }catch (err) {
        console.log(err);
        throw new Error(err);

    }
    
}