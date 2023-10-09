document.addEventListener("DOMContentLoaded", async () => {
    const auctionForm = document.getElementById("auction-form");
    const itemNameInput = document.getElementById("itemName");
    const startingBidInput = document.getElementById("startingBid");
    const itemDescriptionInput = document.getElementById("itemDescription");

    // Handle item listing form submission
    auctionForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const itemName = itemNameInput.value;
        const startingBid = parseFloat(startingBidInput.value);
        const itemDescription = itemDescriptionInput.value;

        if (!itemName || isNaN(startingBid) || startingBid < 0 || !itemDescription) {
            alert("Please enter valid item details.");
            return;
        }

        // You should send the item details to the server for listing
        const response = await fetch("http://localhost:3002/list-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemName,
                startingBid,
                itemDescription
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("Item listed successfully!");
            // Clear the form
            itemNameInput.value = "";
            startingBidInput.value = "";
            itemDescriptionInput.value = "";
        } else {
            alert("Item listing failed. Please try again.");
        }
    });
});
