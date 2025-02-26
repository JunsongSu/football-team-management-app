class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    createPlayer() {
        let playerRow = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = this.name;
        nameCell.className = "text-white";

        let positionCell = document.createElement("td");
        positionCell.innerText = this.position;
        positionCell.className = "text-white";

        let actionCell = document.createElement("td");
        actionCell.className = "d-flex gap-2"; // Ensures spacing between buttons

        // Edit Button
        let editButton = document.createElement("button");
        editButton.className = "btn btn-primary btn-sm text-white me-2";
        editButton.innerText = "Edit";
        editButton.style.backgroundColor = "#007bff";
        editButton.style.border = "none";

        // Delete Button
        let deletePlayerButton = document.createElement("button");
        deletePlayerButton.className = "btn btn-danger btn-sm text-white";
        deletePlayerButton.innerText = "Delete";
        deletePlayerButton.style.backgroundColor = "#dc3545";
        deletePlayerButton.style.border = "none";

        deletePlayerButton.addEventListener("click", () => {
            playerRow.remove();
        });

        // Edit Button Logic
        editButton.addEventListener("click", () => {
            if (editButton.innerText === "Edit") {
                let nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.className = "form-control form-control-sm";
                nameInput.value = this.name;

                let positionSelect = document.createElement("select");
                positionSelect.className = "form-select form-select-sm";

                let positions = [
                    "Quarterback (QB)", "Running Back (RB)", "Wide Receiver (WR)", 
                    "Tight End (TE)", "Offensive Line (OL)", "Defensive Line (DL)", 
                    "Linebacker (LB)", "Cornerback (CB)", "Safety (S)", "Kicker (K)", "Punter (P)"
                ];

                positions.forEach(pos => {
                    let option = document.createElement("option");
                    option.value = pos;
                    option.textContent = pos;
                    if (pos === this.position) option.selected = true;
                    positionSelect.appendChild(option);
                });

                nameCell.innerHTML = "";
                positionCell.innerHTML = "";
                nameCell.appendChild(nameInput);
                positionCell.appendChild(positionSelect);

                editButton.innerText = "Save";
                editButton.className = "btn btn-success btn-sm text-white";
            } else {
                this.name = nameCell.querySelector("input").value;
                this.position = positionCell.querySelector("select").value;

                nameCell.innerText = this.name;
                positionCell.innerText = this.position;

                editButton.innerText = "Edit";
                editButton.className = "btn btn-primary btn-sm text-white";
            }
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deletePlayerButton);

        playerRow.appendChild(nameCell);
        playerRow.appendChild(positionCell);
        playerRow.appendChild(actionCell);

        return playerRow;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    createTeamCard() {
        let teamCard = document.createElement("div");
        teamCard.className = "card mt-2 p-3 bg-dark text-white";

        // Card Header (Title + Delete Button)
        let cardHeader = document.createElement("div");
        cardHeader.className = "card-header bg-dark text-white d-flex justify-content-between align-items-center";
        
        let title = document.createElement("h4");
        title.className = "text-white bg-dark p-2 rounded"; // Add bg-dark for background
        title.innerText = this.name;

        let deleteTeamButton = document.createElement("button");
        deleteTeamButton.className = "btn btn-danger text-white";
        deleteTeamButton.innerText = "Delete";
        deleteTeamButton.style.backgroundColor = "#dc3545";
        deleteTeamButton.style.border = "none";

        deleteTeamButton.addEventListener("click", () => {
            teamCard.remove();
        });

        cardHeader.appendChild(title);
        cardHeader.appendChild(deleteTeamButton);
        teamCard.appendChild(cardHeader);

        // Player Input Fields
        let playerInputDiv = document.createElement("div");
        playerInputDiv.className = "d-flex align-items-center mt-2 gap-2";

        let playerNameInput = document.createElement("input");
        playerNameInput.type = "text";
        playerNameInput.className = "form-control";
        playerNameInput.placeholder = "Player Name";

        let playerPositionSelect = document.createElement("select");
        playerPositionSelect.className = "form-select";
        
        let positions = [
            "Quarterback (QB)", "Running Back (RB)", "Wide Receiver (WR)", 
            "Tight End (TE)", "Offensive Line (OL)", "Defensive Line (DL)", 
            "Linebacker (LB)", "Cornerback (CB)", "Safety (S)", "Kicker (K)", "Punter (P)"
        ];
        
        positions.forEach(position => {
            let option = document.createElement("option");
            option.value = position;
            option.textContent = position;
            playerPositionSelect.appendChild(option);
        });

        let addPlayerButton = document.createElement("button");
        addPlayerButton.className = "btn btn-primary btn-sm text-white";
        addPlayerButton.innerText = "add";
        addPlayerButton.style.backgroundColor = "#007bff";
        addPlayerButton.style.border = "none";

        // Players Table
        let playersTable = document.createElement("table");
        playersTable.className = "table table-dark table-striped mt-2";

        let tableHeader = document.createElement("thead");
        let headerRow = document.createElement("tr");

        let nameHeader = document.createElement("th");
        nameHeader.innerText = "Player Name";

        let positionHeader = document.createElement("th");
        positionHeader.innerText = "Position";

        let actionHeader = document.createElement("th");
        actionHeader.innerText = "Action";

        headerRow.appendChild(nameHeader);
        headerRow.appendChild(positionHeader);
        headerRow.appendChild(actionHeader);
        tableHeader.appendChild(headerRow);

        let tableBody = document.createElement("tbody");
        tableBody.className = "player-table-body";

        playersTable.appendChild(tableHeader);
        playersTable.appendChild(tableBody);

        // Function to Add Player
        addPlayerButton.addEventListener("click", () => {
            let playerName = playerNameInput.value.trim();
            let playerPosition = playerPositionSelect.value;

            if (playerName === "") {
                alert("Please enter a player name.");
                return;
            }

            let newPlayer = new Player(playerName, playerPosition);
            tableBody.appendChild(newPlayer.createPlayer());

            playerNameInput.value = "";
        });

        playerInputDiv.appendChild(playerNameInput);
        playerInputDiv.appendChild(playerPositionSelect);
        playerInputDiv.appendChild(addPlayerButton);

        teamCard.appendChild(playerInputDiv);
        teamCard.appendChild(playersTable);

        return teamCard;
    }
}

// Select button and input field
let createButton = document.getElementById("teamNameCreateButton");
let teamNameInput = document.getElementById("teamNameInput");

// Create container for team cards
let teamTable = document.getElementById("teamTableDiv");

// Function to create a team
const createTeam = () => {
    let teamName = teamNameInput.value.trim();

    if (teamName === "") {
        alert("Please enter a team name!");
        return;
    }

    let newTeam = new Team(teamName);
    teamTable.appendChild(newTeam.createTeamCard());

    teamNameInput.value = "";
};

// Event Listeners
createButton.addEventListener("click", createTeam);
teamNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        createTeam();
    }
});
