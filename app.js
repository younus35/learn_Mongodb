const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('66946a9100170f3bd3dd4e2b')
    .then(user => {
      req.user = user;
      // console.log(req.user)
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://younuscode:y24kUUeY@cluster0.q96wx2k.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then( result =>{
  User.findOne().then(user =>{
      if(!user){
        const user = new User({name:'younus', email:'younus@gmail.com', cart:{ items: []}});
        user.save();
      }
  })
  app.listen(3000);
})
.catch(err =>{
  console.log(err);
})