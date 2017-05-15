var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connect to db
mongoose.connect('mongodb://test:test@ds143141.mlab.com:43141/db_todo');

//create schema - this is like blue print
var todoSchema = new mongoose.Schema({
  item: String
});

//Create a model
var Todo = mongoose.model('Todo',todoSchema);

// Todo({item:"hello"},function(err,data){
//   if(err) throw err;
//   res.json(data);
// });


module.exports = function(app){

  app.get('/todo',function(req,res){
    //get data from db and pass to UI
    Todo.find({},function(err,data){
     if(err) throw err;
     res.render('todo',{todos: data});
   });


  });

  app.post('/todo',urlencodedParser,function(req,res){
    //get data from params and save it in db
    console.log(req.body);
    Todo({item:req.body.item}).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });


  });

  app.delete('/todo/:item',function(req,res){
    //delete the item from db
    Todo.find({item:req.params.item}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });
};
