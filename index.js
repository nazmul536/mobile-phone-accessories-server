const express = require('express');
const app = express();
const cors=require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s3ngn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect()
        const database = client.db("phone_portal)");
        const reviewsCollection=database.collection('reviews');
        const exploreProductsCollection=database.collection('exploreProducts')


      //add a product
      app.post('/exploreProducts', async(req,res)=>{
        const exploreProduct=req.body;
        const result=await exploreProductsCollection.insertOne(exploreProduct);
        // console.log(result)
        res.json(result);
      });

      app.get('/exploreProducts', async(req,res)=>{
        const result=await exploreProductsCollection.find({}).toArray();
        console.log(result)
        res.send(result);

      })



      //Add a Reviews
      app.post('/reviews', async(req,res)=>{
        const review=req.body;
        const result= await reviewsCollection.insertOne(review)
        // console.log(result);
        res.json(result)
      })

      app.get('/reviews', async(req,res)=>{
        const result=await reviewsCollection.find({}).toArray();
        console.log(result)
        res.send(result);
      })


      


    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})