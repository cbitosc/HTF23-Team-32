document.addEventListener("DOMContentLoaded", async () => {
    const auctionList = document.getElementById("auction-list");
    const itemSelect = document.getElementById("item");
    const bidForm = document.getElementById("bid-form");
    const bidAmountInput = document.getElementById("bidAmount");
    const passwordInput = document.getElementById("password");

    // Fetch and populate auction items dynamically
    const response = await fetch("http://localhost:3001/auctions");
    const auctions = await response.json();

    auctions.forEach((auction, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = `${auction.itemName} (Current Bid: $${auction.currentBid})`;
        itemSelect.appendChild(option);
    });

    // Handle bid submission
    bidForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const selectedIndex = itemSelect.value;
        const selectedAuction = auctions[selectedIndex];
        const bidAmount = parseFloat(bidAmountInput.value);

        if (isNaN(bidAmount) || bidAmount <= selectedAuction.currentBid) {
            alert("Invalid bid amount. Please enter a higher amount.");
            return;
        }

        const password = passwordInput.value;
        // You should send the password and bid details to the server for validation
        const response = await fetch("http://localhost:3001/place-bid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                auctionId: selectedAuction._id,
                bidAmount,
                password
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("Bid placed successfully!");
            // Update the displayed bid on the interface
            selectedAuction.currentBid = bidAmount;
            itemSelect.selectedIndex = 0;
            bidAmountInput.value = "";
            passwordInput.value = "";
        } else {
            alert("Bid failed. Please check your password.");
        }
    });
});
