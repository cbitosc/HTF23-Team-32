const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3002;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Use the cors middleware to enable CORS for all routes
app.use(cors());

const auctionSchema = new mongoose.Schema({
    itemName: String,
    startingBid: Number,
    itemDescription: String,
    currentBid: Number,
});

const Auction = mongoose.model('Auction', auctionSchema);

app.use(bodyParser.json());

// Endpoint to list an item for auction
app.post('/list-item', async (req, res) => {
    const { itemName, startingBid, itemDescription } = req.body;

    try {
        const newAuction = new Auction({
            itemName,
            startingBid,
            itemDescription,
            currentBid: startingBid,
        });

        await newAuction.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
