document.addEventListener("DOMContentLoaded", () => {
    fetchSubjects();
});

function fetchSubjects() {
    fetch("https://raw.githubusercontent.com/lagsaa/Lab-5/main/courses.json")
        .then(response => response.json())
        .then(data => displaySubjects(data.subjects))
        .catch(error => console.error("Error fetching subjects:", error));
}

function displaySubjects(subjects) {
    const container = document.getElementById("subjects-container");

    if (!container) {
        console.error("No container found for subjects.");
        return;
    }

    container.innerHTML = ""; // Clear previous content

    // Create Table
    const table = document.createElement("table");
    table.classList.add("subject-table");

    // Table Header
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Year</th>
            <th>Semester</th>
            <th>Courses</th>
        </tr>
    `;
    table.appendChild(thead);

    // Table Body
    const tbody = document.createElement("tbody");

    subjects.forEach(section => {
        const row = document.createElement("tr");

        // Split year and semester
        const [year, semester] = section.year_term.split(" - ");

        // Year Column
        const yearCell = document.createElement("td");
        yearCell.textContent = year;
        row.appendChild(yearCell);

        // Semester Column
        const semesterCell = document.createElement("td");
        semesterCell.textContent = semester;
        row.appendChild(semesterCell);

        // Courses Column
        const coursesCell = document.createElement("td");
        const courseList = document.createElement("ul");

        section.courses.forEach(course => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${course.code}</strong> - ${course.title}`;
            courseList.appendChild(li);
        });

        coursesCell.appendChild(courseList);
        row.appendChild(coursesCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}
