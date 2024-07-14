const getDb = require("../util/database").getDb;
const mongodb = require('mongodb')

class User {
  constructor(name, email){
    this.email = email;
    this.name = name;
  }

  save() {
     const db = getDb();

    return db.collection('users').insertOne(this)
    // .then(result =>{
    //   console.log("result is ", result);
    // })
    // .catch(err =>{
    //   console.log(err);
    // })
  }

  static findById(userId){
    const db = getDb();

    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
    // .next()
    .then(user =>{
      console.log(user);
      return user
    })
    .catch(err =>{
      console.log(err);
    })
  }
}

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
