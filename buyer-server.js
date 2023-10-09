const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Use the cors middleware to enable CORS for all routes
app.use(cors());

const auctionSchema = new mongoose.Schema({
    itemName: String,
    currentBid: Number,
});

const Auction = mongoose.model('Auction', auctionSchema);

app.use(bodyParser.json());

// Endpoint to fetch active auctions
app.get('/auctions', async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to place a bid on an auction
app.post('/place-bid', async (req, res) => {
    const { auctionId, bidAmount, password } = req.body;

    try {
        const auction = await Auction.findById(auctionId);

        if (!auction) {
            return res.status(404).json({ error: 'Auction not found' });
        }

        // You should implement user authentication here and verify the password

        if (auction.currentBid >= bidAmount) {
            return res.status(400).json({ error: 'Invalid bid amount' });
        }

        auction.currentBid = bidAmount;
        await auction.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
