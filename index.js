const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4qagepd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const creatorCollection = client.db('Creators-donation-api').collection('creators');
        app.get('/creator', async (req, res) => {
            const query = {};
            const cursor = creatorCollection.find(query);
            const creators = await cursor.toArray();
            res.send(creators)
        });
        app.get('/creator/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const creators = await creatorCollection.findOne(query);
            res.send(creators);
        });

    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(' Creator Donation Server Running well!')
})

app.listen(port, () => {
    console.log(`Hello from Donation Server ${port}`)
})