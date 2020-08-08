// const indexedDB = window.indexedDB || window.webkitIndexedDB;

let db;

const dbRequest = indexedDB.open("fitness-tracker", 1);

dbRequest.onupgradeneeded = ({ target }) => {
    let db = target.result;
    db.createObjectStore("workouts", { autoIncrement: true });
};

dbRequest.onsuccess = ({ target }) => {
    db = target.result;
    //check to see if app is online before reading the database
    if (navigator.onLine) {
        checkDatabase();
    }
};

dbRequest.onerror = function (event) {
    console.log("Dang it!" + event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(["workout"], "readwrite");
    const store = transaction.objectStore("workout");
    store.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(["workout"], "readwrite");
    const store = transaction.objectStore("workout");
    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("api/workouts/:id", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then(() => {
                    const transaction = db.transaction(["workout"], "readwrite");
                    const store = transaction.objectStore("workout");
                    store.clear();
                });
        }
    };
}
//listen for the app to come back
window.addEventListener("online", checkDatabase);
