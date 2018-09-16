const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://hemant:password123@ds139124.mlab.com:39124/nhemnt-todo', ['todos']);

router.get("/todos", function (req, res, next) {
    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    })
});

// get single todo
router.get("/todo/:id", function (req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectID(req.params.id)
    }, function (err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    })
});

//save todo
router.post("/todo",function(req,res,next){
    const todo = req.body;
    console.log(todo);
    if(!todo.text || !(todo.isCompleted+ '')){
        res.status(400);
        res.json({
            "error": "invalid data"
            });
    }else{
        db.todos.save(todo,function(err,result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        })
    }
});

//update todo
router.put("/todo/:id",function(req,res,next){
    const todo= req.body;
    var updObj={};
    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }
    if(todo.text){
        updObj.text = todo.text;
    }
    if(!updobj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }else{
        db.todos.update({
            _id: mongojs.ObjectID(req.params.id)
        },updObj,{},function(err, result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        })
    }
});

//delete todo
router.delete("/todo/:id",function(req,res,next){
    db.todos.remove({
        _id : mongojs.ObjectID(req.params.id)
    },'',function(err,result){
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    })
});

module.exports = router;