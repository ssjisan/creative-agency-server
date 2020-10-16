const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

/*************************************Connect With Cluster***********************************/ 

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.larxv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("creativeAgency").collection("serviceOrder");
  /********************************POST data to server*****************************/ 
  app.post('/orderPlaced',(req,res)=>{
    const order = req.body;
    console.log(order);
      collection.insertOne(order)
        .then(result=>{
            res.send(result.insertedCount > 0)
      })
  })
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
    /********************************Get data from server*****************************/ 
    app.get ('/orderedservice',(req,res)=>{
      const mail = req.query.email;
      collection.find({email:mail})
      .toArray((err, documents) => {
      res.send(documents);
    })
    })

})
app.listen(process.env.PORT || port)