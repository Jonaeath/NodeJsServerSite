const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Simple Node Server Running");
});

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Hasina", email: "hasina@gmail.com" },
  { id: 2, name: "Kalada", email: "kalada@gmail.com" },
  { id: 3, name: "Tarak", email: "Tarak@gmail.com" },
];

// 7inkTZ4T52SzJbEL

const uri =
  "mongodb+srv://jonaeathbcc18:7inkTZ4T52SzJbEL@cluster0.hbd1xik.mongodb.net/?authSource=admin";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run(){
    try{
        const userCollection = client.db('simpleNode').collection('users');
        const user = {name:'Manali kha', email:'manalikhan@gmail.com'};
        const result = await userCollection.insertOne(user);
        console.log(result);
    }
    finally{

    }

}
run().catch(e =>console.log(e));

app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  console.log("Post API Called");
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`simple node server running on port ${port}`);
});
