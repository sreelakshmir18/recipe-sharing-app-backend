// 1. import express
const express = require('express')

const userController = require('../Controllers/userController')
const recipeController = require('../Controllers/recipeController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')


//2. create router object of express to define path
const router =express.Router()

//3.Register api call
router.post('/register',userController.register)

//4. login API  call
router.post('/login',userController.login)


//5. add recipe api call
router.post('/recipe/add-recipe',jwtMiddleware,multerConfig.single('recipeImage'),recipeController.addRecipes)

//6. Get a single recipe details API
router.get('/recipe/get-a-recipe',jwtMiddleware,recipeController.getARecipe)

//7. Get 4 recipes details for home recipe
router.get('/recipe/home-recipe',recipeController.getHomeRecipes)


//8. get all recipes
router.get('/recipe/all-recipe',jwtMiddleware,recipeController.getAllRecipes)

//9.delete recipe
router.delete('/recipe/delete-recipe/:rid',jwtMiddleware,recipeController.deleteRecipe)

//10. Udate recipe
router.put('/recipe/update-recipe/:rid',jwtMiddleware,multerConfig.single('recipeImage'),recipeController.updateRecipe)


// 11. Get all users
router.get('/users', jwtMiddleware, userController.getAllUsers);

// 12. Update user status (approve/reject)
router.put('/update-status/:uid', jwtMiddleware, userController.updateUserStatus);


module.exports = router