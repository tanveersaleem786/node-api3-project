const express = require('express');
const userDB = require('./userDb.js');
const postDB = require('../posts/postDb.js')

const router = express.Router();

// Create New User
router.post('/', validateUser(), (req, res) => {  
        
    userDB.insert(req.body) 
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        next(error)
      })   

});


// Create New Post By User ID
router.post('/:id/posts', validatePost(), validateUserId() ,(req, res) => {
  
     const user_id = req.params.id 
    // const { text } = req.body;
    // const { id: user_id } = req.params;
    // insert({ text, user_id })
    req.body = {...req.body, "user_id": user_id}
    //console.log(req.body);
    postDB.insert(req.body)
      .then((post) => {
        res.status(201).json(post)
      })
      .catch((error) => {
        next(error)
      })    
        
});


// Get Users
router.get('/', (req, res) => {
    
    userDB.get()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        next(error)
      })
  
});

// Get User By ID
router.get('/:id', validateUser(), (req, res) => {    
    res.status(200).json(req.user)    
});

// Get User Posts By User ID
router.get('/:id/posts', validateUserId(), (req, res) => {
  
    userDB.getUserPosts(req.params.id)
      .then((posts) => {
        res.json(posts)
      })
      .catch((error) => {
        next(error)
      })

});


// Delete User By ID
router.delete('/:id', (req, res) => {
  
    userDB.remove(req.params.id)
      .then((users) => {
        res.json(users)
      })
      .catch((error) => {
        next(error)
      })

});


// Update User By ID
router.put('/:id', validateUser(), validateUserId(), (req, res) => {
 
    userDB.update(req.params.id,req.body)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((error) => {
        next(error)
      })
   

});


//custom middleware

function validateUserId(req, res, next) {
  
    return (req, res, next) => {

      userDB.getById(req.params.id)
        .then((user) => {
          if(user) {
              req.user = user
              next()
          } else {
            res.status(404).json({message: "The user with the specified ID does not exist"})
            res.json(user); 
          }
          
        })
        .catch((error) => {
            next(error)
        })

    }  
  
  
}

function validateUser(req, res, next) {

    return (req, res, next) => {

        if(!req.body.name) {
          res.status(400).json({
            message: "Please provide name for the user."
          })
        } else {
          next()
        }
    }   
}

function validatePost(req, res, next) {
    
     return (req, res, next) => {
         
        if(!req.body.text) {
          res.status(400).json({
            message: "Please provide name for the post."
          })
        } else {
          next()
        }


     }
  
}

module.exports = router;
