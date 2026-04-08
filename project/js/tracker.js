let meds = JSON.parse(localStorage.getItem("medications")) || [];

const form = document.getElementById("med-form");
const list = document.getElementById("med-list");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const strength = Number(document.getElementById("strength").value);
    const total = Number(document.getElementById("total").value);
    const dailyDose = Number(document.getElementById("dailyDose").value);
    const refillThreshold = Number(document.getElementById("refillThreshold").value);
    const notes = document.getElementById("notes").value.trim();

    if (name === "" || strength <= 0 || total < 0 || dailyDose <= 0 || refillThreshold < 0) {
        return;
    }

    const med = {
        id: Date.now(),
        name: name,
        strength: strength,
        total: total,
        dailyDose: dailyDose,
        refillThreshold: refillThreshold,
        notes: notes,
        takenToday: false,
        lastTakenDate: ""
    };

    meds.push(med);
    saveMeds();
    displayMeds();
    form.reset();
});

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
}

function resetDailyStatus() {
    const today = getTodayDate();

    meds.forEach(function (med) {
        if (med.lastTakenDate !== today) {
            med.takenToday = false;
        }
    });
}

function getStatus(med) {
    if (med.total === 0) {
        return {
            text: "Out of stock",
            className: "status-danger"
        };
    } else if (med.total <= med.refillThreshold) {
        return {
            text: "Refill soon",
            className: "status-warning"
        };
    } else {
        return {
            text: "Stock is okay",
            className: "status-good"
        };
    }
}

function displayMeds() {
    resetDailyStatus();
    saveMeds();

    list.innerHTML = "";

    if (meds.length === 0) {
        list.innerHTML = `
            <div class="card center">
                <p>No medications added yet.</p>
            </div>
        `;
        return;
    }

    meds.forEach(function (med) {
        const daysLeft = med.dailyDose > 0 ? Math.floor(med.total / med.dailyDose) : 0;
        const status = getStatus(med);

        const card = document.createElement("article");
        card.classList.add("card");

        if (med.total === 0) {
            card.classList.add("out-of-stock-card");
        }

        const todayClass = med.takenToday ? "status-good" : "status-warning";
        const todayText = med.takenToday ? "Taken" : "Not taken";

        card.innerHTML = `
            <h3>${med.name}</h3>
            <p><strong>Strength:</strong> ${med.strength} mg</p>
            <p><strong>Total pills:</strong> ${med.total}</p>
            <p><strong>Daily dose:</strong> ${med.dailyDose} pill(s)</p>
            <p><strong>Refill alert:</strong> ${med.refillThreshold} pill(s)</p>
            <p><strong>Days left:</strong> ${daysLeft}</p>
            <p><strong>Status:</strong> <span class="${status.className}">${status.text}</span></p>
            <p><strong>Today:</strong> <span class="${todayClass}">${todayText}</span></p>
            <p><strong>Notes:</strong> ${med.notes ? med.notes : "No notes added."}</p>

            <div class="card-actions">
                <button
                    class="taken-btn"
                    data-id="${med.id}"
                    ${med.takenToday || med.total === 0 ? "disabled" : ""}>
                    Taken Today
                </button>

                <button
                    class="undo-btn"
                    data-id="${med.id}"
                    ${!med.takenToday ? "disabled" : ""}>
                    Undo
                </button>

                <button class="delete-btn" data-id="${med.id}">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(card);
    });

    attachButtonEvents();
}

function attachButtonEvents() {
    const takenButtons = document.querySelectorAll(".taken-btn");
    const undoButtons = document.querySelectorAll(".undo-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    takenButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const medId = Number(button.dataset.id);

            const med = meds.find(function (item) {
                return item.id === medId;
            });

            if (!med) {
                return;
            }

            const today = getTodayDate();

            if (!med.takenToday && med.total > 0) {
                med.total = Math.max(0, med.total - med.dailyDose);
                med.takenToday = true;
                med.lastTakenDate = today;

                saveMeds();
                displayMeds();
            }
        });
    });

    undoButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const medId = Number(button.dataset.id);

            const med = meds.find(function (item) {
                return item.id === medId;
            });

            if (!med) {
                return;
            }

            if (med.takenToday) {
                med.total = med.total + med.dailyDose;
                med.takenToday = false;
                med.lastTakenDate = "";

                saveMeds();
                displayMeds();
            }
        });
    });

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const medId = Number(button.dataset.id);

            meds = meds.filter(function (item) {
                return item.id !== medId;
            });

            saveMeds();
            displayMeds();
        });
    });
}

function saveMeds() {
    localStorage.setItem("medications", JSON.stringify(meds));
}

displayMeds();