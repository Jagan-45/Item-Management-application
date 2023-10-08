document.addEventListener("DOMContentLoaded", function () {
    const addItemForm = document.getElementById("addItemForm");
    const itemList = document.getElementById("itemList");
    const getAllItemsButton = document.getElementById("getAllItems");
    const getItemByIdButton = document.getElementById("getItemById");
    const itemIdInput = document.getElementById("itemId");

    // Hide the item list initially
    itemList.style.display = "none";

    // Function to fetch and display items
    function fetchAndDisplayItems() {
        fetch("/api/items")
            .then((response) => response.json())
            .then((data) => {
                itemList.innerHTML = ""; // Clear the item list
                data.forEach((item) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Description: ${item.description}`;
                    itemList.appendChild(listItem);
                });
                itemList.style.display = "block"; // Show the item list
            })
            .catch((error) => console.error("Error fetching items:", error));
    }

    // Event listener for the "Get All Items" button
    getAllItemsButton.addEventListener("click", function () {
        fetchAndDisplayItems();
    });

    // Event listener for the "Get Item by ID" button
    getItemByIdButton.addEventListener("click", function () {
        const itemId = itemIdInput.value;
        if (itemId) {
            fetch(`/api/items/${itemId}`)
                .then((response) => response.json())
                .then((item) => {
                    itemList.innerHTML = ""; // Clear the item list
                    if (item) {
                        const listItem = document.createElement("li");
                        listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Description: ${item.description}`;
                        itemList.appendChild(listItem);
                        itemList.style.display = "block"; // Show the item list
                    } else {
                        itemList.textContent = "Item not found.";
                        itemList.style.display = "block"; // Show the item list
                    }
                })
                .catch((error) => console.error("Error fetching item by ID:", error));
        }
    });

    // Event listener for the form submission
    addItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        // Make a POST request to add a new item
        fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                // Clear form fields
                document.getElementById("name").value = "";
                document.getElementById("description").value = "";
            })
            .catch((error) => console.error("Error adding item:", error));
    });
});
