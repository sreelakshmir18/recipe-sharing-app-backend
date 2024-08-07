const recipes = require('../Models/recipeSchema')

//add recipes logic
exports.addRecipes =async(req,res)=>{
    console.log("Inside the add recipe method");

    const {name,ingredients,instructions,preparationtime,youtube} = req.body
    const recipeImage = req.file.filename
    const userId = req.payload
    console.log(name,ingredients,instructions,preparationtime,youtube,recipeImage);
    console.log(userId);


    try{
        const existingRecipe = await recipes.findOne({name})
        if(existingRecipe){
            res.status(404).json("Recipe already added")
        }
        else{
            const newRecipe = new recipes({name,ingredients,instructions,preparationtime,youtube,recipeImage,userId})
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

    }
    catch(err){
        res.status(401).json({message:err.message});
    }
   
}

//1. Get a single  recipe 

exports.getARecipe = async(req,res)=>{
    
    const userId = req.payload
    try{
        const ARecipe = await recipes.find({userId})
        if(ARecipe){
            res.status(200).json(ARecipe)
        }
        else{
            res.status(401).json("Can't find any dishes");
        }
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
}
//2. get 4 recipe details for home recipes
exports.getHomeRecipes = async(req,res)=>{

    try{
        const HomeRecipe = await recipes.find().limit(3)
        if(HomeRecipe){
            res.status(200).json(HomeRecipe)
        }
        else{
            res.status(401).json("Can't find any dishes");
        }
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
}

//3. get all recipe details
exports.getAllRecipes = async(req,res)=>{


    const searchKey = req.query.search
    console.log(searchKey);

    let query = {}

    //case sensitive & searching recipes
    if (searchKey){
        query.name = {$regex: searchKey, $options:"i"}
    }

    try{
        const AllRecipes = await recipes.find(query)
        if(AllRecipes){
            res.status(200).json(AllRecipes)
        }
        else{
            res.status(401).json("Can't find any dishes");
        }
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
}

//4. delete recipes
exports.deleteRecipe = async(req,res)=>{
    const {rid} = req.params // get a recipe id
    try{
        const deleteARecipe = await recipes.findOneAndDelete({_id:rid})
        // Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
        res.status(200).json(deleteARecipe)
    }
    catch(err){
        res.status(402).json({message:err.message});
    }
}

///5. update recipe
exports.updateRecipe = async (req,res) =>{
    const { name, ingredients, instructions, preparationtime, youtube, recipeImage } = req.body
    console.log( name, ingredients, instructions, preparationtime, youtube);
    userId = req.payload
    const {rid} = req.params
    const uploadImage = req.file?req.file.filename:recipeImage
    try{
       
        const updateRecipe = await recipes.findByIdAndUpdate({_id:rid},{name, ingredients, instructions, preparationtime, youtube, recipeImage:uploadImage,userId})
        await updateRecipe.save()
        res.status(200).json(updateRecipe)
    }
    catch(err){
        res.status(401).json({ message: err.message });
    }
}




