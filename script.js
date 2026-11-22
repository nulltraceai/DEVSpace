
/* =========================================
   DEVSPACE - PERSONAL DEVELOPER HUB
========================================= */


/* =========================================
   PART 1: WELCOME BUTTON
========================================= */

const startButton = document.getElementById("startBtn");

const message = document.getElementById("message");

startButton.addEventListener("click", function() {

    const learningSection = document.querySelector(".learning-section");

    learningSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    document.getElementById("skillInput").focus();

});



/* =========================================
   PART 2: LEARNING TRACKER
========================================= */

// 1. GET HTML ELEMENTS

const skillForm = document.getElementById("skillForm");
const skillInput = document.getElementById("skillInput");
const skillList = document.getElementById("skillList");


// 2. LOAD SAVED SKILLS

let skills = JSON.parse(
    localStorage.getItem("devspaceSkills")
) || [];


// 3. SAVE SKILLS

function saveSkills() {

    localStorage.setItem(
        "devspaceSkills",
        JSON.stringify(skills)
    );

}


// 4. DETERMINE SKILL STATUS

function getStatus(progress) {

    if (progress === 100) return "Completed!";

    if (progress >= 76) return "Almost There";

    if (progress >= 51) return "Improving";

    if (progress >= 26) return "Learning";

    return "Just Started";

}


// 5. ADD NEW SKILL

skillForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const skillName = skillInput.value.trim();

    if (skillName === "") return;

    skills.push({

        id: Date.now(),

        name: skillName,

        progress: 0

    });

    saveSkills();

    renderSkills();

    updateDashboard();

    updateAnalyticsCharts();

    skillInput.value = "";

});


// 6. DISPLAY SKILLS

function renderSkills() {

    skillList.innerHTML = "";

    skills.forEach(function(skill) {

        // CREATE CARD

        const card = document.createElement("div");

        card.className = "skill-item";


        // SKILL NAME AND PERCENTAGE

        const top = document.createElement("div");

        top.className = "skill-top";

        const name = document.createElement("h3");

        name.textContent = skill.name;

        const percentage = document.createElement("span");

        percentage.className = "skill-percent";

        percentage.textContent = skill.progress + "%";

        top.append(name, percentage);


        // PROGRESS BAR

        const track = document.createElement("div");

        track.className = "progress-track";

        const fill = document.createElement("div");

        fill.className = "progress-fill";

        fill.style.width = skill.progress + "%";

        track.appendChild(fill);


        // SLIDER

        const controls = document.createElement("div");

        controls.className = "skill-controls";

        const slider = document.createElement("input");

        slider.type = "range";

        slider.min = 0;

        slider.max = 100;

        slider.value = skill.progress;

        controls.appendChild(slider);


        // STATUS

        const status = document.createElement("p");

        status.className = "skill-status";

        status.textContent = getStatus(skill.progress);


        // UPDATE PROGRESS

        slider.addEventListener("input", function() {

            skill.progress = Number(slider.value);

            percentage.textContent = skill.progress + "%";

            fill.style.width = skill.progress + "%";

            status.textContent = getStatus(skill.progress);

            saveSkills();

            updateAnalyticsCharts();

            updateDashboard();

        });


        // EDIT SKILL

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {

            const newName = prompt(
                "Enter new skill name:",
                skill.name
            );

            if (newName && newName.trim() !== "") {

                skill.name = newName.trim();

                saveSkills();

                renderSkills();

                updateAnalyticsCharts();

            }

        });


        // DELETE SKILL

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            const confirmDelete = confirm(
                "Are you sure you want to delete this skill?"
            );

            if (confirmDelete) {

                skills = skills.filter(function(item) {

                    return item.id !== skill.id;

                });

                saveSkills();

                renderSkills();

                updateAnalyticsCharts();

                updateDashboard();

            }

        });


        // ADD ELEMENTS TO CARD

        card.append(
            top,
            track,
            controls,
            status,
            editButton,
            deleteButton
        );

        skillList.appendChild(card);

    });

}


// 7. DISPLAY PREVIOUSLY SAVED SKILLS

renderSkills();






/* =========================================
   PART 3: PROJECTS VAULT
========================================= */

// 1. GET HTML ELEMENTS

const projectForm = document.getElementById("projectForm");

const projectName = document.getElementById("projectName");

const projectTech = document.getElementById("projectTech");

const projectDescription = document.getElementById("projectDescription");

const projectLink = document.getElementById("projectLink");

const projectList = document.getElementById("projectList");


// 2. LOAD SAVED PROJECTS

let projects = JSON.parse(
    localStorage.getItem("devspaceProjects")
) || [];


// 3. SAVE PROJECTS

function saveProjects() {

    localStorage.setItem(
        "devspaceProjects",
        JSON.stringify(projects)
    );

}


// 4. ADD NEW PROJECT

projectForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newProject = {

        id: Date.now(),

        name: projectName.value.trim(),

        tech: projectTech.value.trim(),

        description: projectDescription.value.trim(),

        link: projectLink.value.trim(),

        status: "In Progress"

    };

    projects.push(newProject);

    saveProjects();

    renderProjects();

    updateDashboard();

    projectForm.reset();

});


// 5. DISPLAY PROJECTS

function renderProjects() {

    projectList.innerHTML = "";

    projects.forEach(function(project) {

        // CREATE PROJECT CARD

        const card = document.createElement("div");

        card.className = "project-card";


        // PROJECT NAME

        const title = document.createElement("h3");

        title.textContent = project.name;


        // PROJECT DESCRIPTION

        const description = document.createElement("p");

        description.textContent = project.description;


        // TECHNOLOGIES USED

        const tech = document.createElement("div");

        tech.className = "project-tech";

        tech.textContent = "Tech: " + project.tech;


        // PROJECT STATUS DROPDOWN

        const status = document.createElement("select");

        status.className = "project-status";

        const statuses = [

            "Not Started",

            "In Progress",

            "Completed"

        ];

        statuses.forEach(function(optionText) {

            const option = document.createElement("option");

            option.value = optionText;

            option.textContent = optionText;

            status.appendChild(option);

        });

        status.value = project.status || "In Progress";


        // UPDATE PROJECT STATUS

        status.addEventListener("change", function() {

            project.status = status.value;

            saveProjects();

            updateAnalyticsCharts();

        });


        // GITHUB LINK

        let link = null;

        if (project.link) {

            const newLink = document.createElement("a");

            newLink.textContent = "View on GitHub";

            newLink.className = "project-link";

            try {

                const parsedURL = new URL(project.link);

                if (
                    parsedURL.protocol === "https:" ||
                    parsedURL.protocol === "http:"
                ) {

                    newLink.href = parsedURL.href;

                    newLink.target = "_blank";

                    newLink.rel = "noopener noreferrer";

                    link = newLink;

                }

            } catch (error) {

                console.log("Invalid project URL");

            }

        }


        // EDIT PROJECT BUTTON

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {

            const updatedName = prompt(
                "Enter new project name:",
                project.name
            );

            if (updatedName === null) return;

            if (updatedName.trim() === "") return;

            project.name = updatedName.trim();

            saveProjects();

            renderProjects();

        });


        // DELETE PROJECT BUTTON

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            const confirmDelete = confirm(
                "Are you sure you want to delete this project?"
            );

            if (confirmDelete) {

                projects = projects.filter(function(item) {

                    return item.id !== project.id;

                });

                saveProjects();

                renderProjects();

                updateDashboard();

            }

        });


        // CREATE ACTION BUTTON CONTAINER

        const actions = document.createElement("div");

        actions.className = "project-actions";

        actions.append(
            editButton,
            deleteButton
        );


        // ADD PROJECT ELEMENTS TO CARD

        card.append(
            title,
            description,
            tech,
            status
        );


        // ADD GITHUB LINK IF AVAILABLE

        if (link) {

            card.append(link);

        }


        // ADD EDIT AND DELETE BUTTONS

        card.append(actions);


        // DISPLAY PROJECT CARD

        projectList.appendChild(card);

    });

}


// 6. DISPLAY PREVIOUSLY SAVED PROJECTS

renderProjects();



/* =========================================
   PART 4: DYNAMIC DASHBOARD
========================================= */

// 1. GET DASHBOARD ELEMENTS

const totalSkillsElement = document.getElementById("totalSkills");

const totalProjectsElement = document.getElementById("totalProjects");

const overallProgressElement = document.getElementById("overallProgress");


// 2. UPDATE DASHBOARD STATISTICS

function updateDashboard() {

    // COUNT TOTAL SKILLS

    totalSkillsElement.textContent =
        skills.length.toString().padStart(2, "0") + " Topics";


    // COUNT TOTAL PROJECTS

    totalProjectsElement.textContent =
        projects.length.toString().padStart(2, "0") + " Projects";


    // CALCULATE AVERAGE PROGRESS

    let totalProgress = 0;

    skills.forEach(function(skill) {

        totalProgress += Number(skill.progress);

    });


    let averageProgress = 0;

    if (skills.length > 0) {

        averageProgress = Math.round(
            totalProgress / skills.length
        );

    }


    // DISPLAY AVERAGE

    overallProgressElement.textContent =
        averageProgress + "%";

}


// 3. INITIAL DASHBOARD UPDATE

updateDashboard();



/* =========================================
   PART 5: RESOURCE LIBRARY
========================================= */

// 1. GET HTML ELEMENTS

const resourceForm = document.getElementById("resourceForm");

const resourceTitle = document.getElementById("resourceTitle");

const resourceCategory = document.getElementById("resourceCategory");

const resourceUrl = document.getElementById("resourceUrl");

const resourceList = document.getElementById("resourceList");


// 2. LOAD SAVED RESOURCES

let resources = JSON.parse(
    localStorage.getItem("devspaceResources")
) || [];


// 3. SAVE RESOURCES

function saveResources() {

    localStorage.setItem(
        "devspaceResources",
        JSON.stringify(resources)
    );

}


// 4. ADD NEW RESOURCE

resourceForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newResource = {

        id: Date.now(),

        title: resourceTitle.value.trim(),

        category: resourceCategory.value,

        url: resourceUrl.value.trim()

    };


    // VALIDATE URL

    try {

        const parsedURL = new URL(newResource.url);

        if (
            parsedURL.protocol !== "https:" &&
            parsedURL.protocol !== "http:"
        ) {

            alert("Please enter a valid web link.");

            return;

        }

        newResource.url = parsedURL.href;

    } catch (error) {

        alert("Please enter a valid URL.");

        return;

    }


    // ADD RESOURCE TO ARRAY

    resources.push(newResource);

    saveResources();

    renderResources();

    resourceForm.reset();

});


// 5. DISPLAY RESOURCES

function renderResources() {

    resourceList.innerHTML = "";

    resources.forEach(function(resource) {

        // CREATE RESOURCE CARD

        const card = document.createElement("div");

        card.className = "resource-card";


        // RESOURCE TITLE

        const title = document.createElement("h3");

        title.textContent = resource.title;


        // RESOURCE CATEGORY

        const category = document.createElement("p");

        category.className = "resource-category";

        category.textContent = resource.category;


        // RESOURCE LINK

        const link = document.createElement("a");

        link.textContent = "Open Resource ↗";

        link.href = resource.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";


        // EDIT BUTTON

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {

            const updatedTitle = prompt(
                "Enter resource title:",
                resource.title
            );

            if (updatedTitle === null) return;

            if (updatedTitle.trim() === "") return;


            const updatedCategory = prompt(
                "Enter resource category:",
                resource.category
            );

            if (updatedCategory === null) return;

            if (updatedCategory.trim() === "") return;


            const updatedUrl = prompt(
                "Enter resource URL:",
                resource.url
            );

            if (updatedUrl === null) return;


            // VALIDATE UPDATED URL

            try {

                const parsedURL = new URL(updatedUrl.trim());

                if (
                    parsedURL.protocol !== "https:" &&
                    parsedURL.protocol !== "http:"
                ) {

                    alert("Please enter a valid web link.");

                    return;

                }

                resource.title = updatedTitle.trim();

                resource.category = updatedCategory.trim();

                resource.url = parsedURL.href;

                saveResources();

                renderResources();

            } catch (error) {

                alert("Please enter a valid URL.");

            }

        });


        // DELETE BUTTON

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            const confirmDelete = confirm(
                "Are you sure you want to delete this resource?"
            );

            if (confirmDelete) {

                resources = resources.filter(function(item) {

                    return item.id !== resource.id;

                });

                saveResources();

                renderResources();

            }

        });


        // BUTTON CONTAINER

        const actions = document.createElement("div");

        actions.className = "resource-actions";

        actions.append(
            editButton,
            deleteButton
        );


        // ADD EVERYTHING TO THE CARD

        card.append(
            title,
            category,
            link,
            actions
        );


        // DISPLAY THE CARD

        resourceList.appendChild(card);

    });

}


// 6. DISPLAY PREVIOUSLY SAVED RESOURCES

renderResources();


/* =========================================
   PART 6: DEVSPACE ANALYTICS
========================================= */

// Store chart objects so we can update them later.

let skillChart = null;
let projectChart = null;


// FUNCTION TO UPDATE BOTH GRAPHS

function updateAnalyticsCharts() {

    // GET CANVAS ELEMENTS

    const skillCanvas = document.getElementById("skillChart");
    const projectCanvas = document.getElementById("projectChart");

    // PREPARE SKILL DATA

    const skillNames = skills.map(function(skill) {
        return skill.name;
    });

    const skillProgress = skills.map(function(skill) {
        return Number(skill.progress);
    });


    // PREPARE PROJECT STATUS DATA

    const completedProjects = projects.filter(function(project) {
        return project.status === "Completed";
    }).length;

    const inProgressProjects = projects.filter(function(project) {
        return (project.status || "In Progress") === "In Progress";
    }).length;

    const notStartedProjects = projects.filter(function(project) {
        return project.status === "Not Started";
    }).length;


    // CREATE SKILL BAR CHART

    if (skillChart === null) {

        skillChart = new Chart(skillCanvas, {

            type: "bar",

            data: {
                labels: skillNames,

                datasets: [{
                    label: "Skill Progress",
                    data: skillProgress,
                    backgroundColor: "#9878FF",
                    borderRadius: 7,
                    barThickness: 22
                }]
            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                indexAxis: "y",

                scales: {

                    x: {
                        min: 0,
                        max: 100,

                        ticks: {
                            color: "#A1A8BA",
                            callback: function(value) {
                                return value + "%";
                            }
                        },

                        grid: {
                            color: "#252C3D"
                        }
                    },

                    y: {
                        ticks: {
                            color: "#F4F5FA"
                        },

                        grid: {
                            display: false
                        }
                    }

                },

                plugins: {
                    legend: {
                        display: false
                    }
                }

            }

        });

    } else {

        // UPDATE EXISTING SKILL CHART

        skillChart.data.labels = skillNames;

        skillChart.data.datasets[0].data = skillProgress;

        skillChart.update();

    }


    // CREATE PROJECT DOUGHNUT CHART

    if (projectChart === null) {

        projectChart = new Chart(projectCanvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Completed",
                    "In Progress",
                    "Not Started"
                ],

                datasets: [{

                    data: [
                        completedProjects,
                        inProgressProjects,
                        notStartedProjects
                    ],

                    backgroundColor: [
                        "#9878FF",
                        "#4C8DFF",
                        "#E6A34A"
                    ],

                    borderColor: "#151925",
                    borderWidth: 4,
                    hoverOffset: 8

                }]

            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                cutout: "65%",

                plugins: {

                    legend: {
                        position: "bottom",

                        labels: {
                            color: "#F4F5FA",
                            padding: 18,
                            usePointStyle: true
                        }
                    }

                }

            }

        });

    } else {

        // UPDATE EXISTING PROJECT CHART

        projectChart.data.datasets[0].data = [
            completedProjects,
            inProgressProjects,
            notStartedProjects
        ];

        projectChart.update();

    }

}


// INITIAL GRAPH DISPLAY

updateAnalyticsCharts();




/* =========================================
   END OF DEVSPACE JAVASCRIPT
========================================= */
