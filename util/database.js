const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; //name can be anything for ex: mongoClient

let _db;

const mongoConnect = (callback) =>{
  MongoClient.connect('mongodb+srv://younuscode:y24kUUeY@cluster0.q96wx2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(client =>{
    console.log('connected');
    _db = client.db();
    callback();
  })
  .catch(err =>{
    console.log(err);
  })
}

const getDb = () =>{
  if(_db){
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
