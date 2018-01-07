var express = require('express');
var Message = require("../models/messages.model");
var router = express.Router();

router.get('/', function(req, res, next) {
      Message.find()
        .exec((err, messages) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            }); 
      });
});

router.post('/', function(req, res, next) {
    var message = new Message({
        content: req.body.content
    });

    message.save(function(err, result){
        if(err){
            return res.status(500).json({
               title: 'An error occurred',
               error: err
            });
        }   
        res.status(201).json({
           message: 'User created',
           obj: result
        });
    });
    
});

router.delete("/:id", function(req, res, next) {
    Message.findById(req.params.id, function(err, message){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            }); 
        }
        if(!message){
            res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        message.remove(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            } 
            res.status(201).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

router.patch("/:id/:message", function(req, res, next) {
    const content = req.params.message;
    const id = req.params.id;

    Message.updateOne({_id: id}, {$set: {content: content}}, function(err, result, next){
        if(err){
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        res.status(201).json({
            message: 'Updated message',
            obj: result,
            result: {content: content, _id: id}
        });
    });
});

module.exports = router;
