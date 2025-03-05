document.addEventListener("DOMContentLoaded", () => {
    fetchSubjects();
});

// Fetch subjects from JSON file
async function fetchSubjects() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/lagsaa/Lab-5/main/courses.json");

        if (!response.ok) {
            throw new Error(`Failed to fetch subjects: ${response.statusText}`);
        }

        const data = await response.json();
        displaySubjects(data.subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}

// Function to display subjects in a properly formatted table
function displaySubjects(subjects) {
    const container = document.getElementById("subjects-container");

    if (!container) {
        console.error("Error: #subjects-container not found in DOM.");
        return;
    }

    container.innerHTML = ""; // Clear previous content

    // Create table
    const table = document.createElement("table");
    table.classList.add("subject-table");

    // Table Header
    table.innerHTML = `
        <thead>
            <tr>
                <th>Year</th>
                <th>Semester</th>
                <th>Subject Code</th>
                <th>Descriptive Title</th>
            </tr>
        </thead>
    `;

    // Table Body
    const tbody = document.createElement("tbody");

    subjects.forEach(section => {
        section.courses.forEach((course, index) => {
            const row = document.createElement("tr");

            // Only show Year and Semester for the first course in each term
            row.innerHTML = `
                <td>${index === 0 ? section.year_term.split(" - ")[0] : ""}</td>
                <td>${index === 0 ? section.year_term.split(" - ")[1] : ""}</td>
                <td>${course.code}</td>
                <td>${course.title}</td>
            `;

            tbody.appendChild(row);
        });
    });

    table.appendChild(tbody);
    container.appendChild(table);
}
