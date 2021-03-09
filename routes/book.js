var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/type/:type', async (req, res, next) =>{

  try{
    if(req.params.type == 'hardcover'){
      var result = await axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=oGGpUVmWGXyAqP6AiESGm0rpAJ890oAb');
    }
    if(req.params.type == 'ebook'){
      var result = await axios.get('https://api.nytimes.com/svc/books/v3/lists/current/e-book-fiction.json?api-key=oGGpUVmWGXyAqP6AiESGm0rpAJ890oAb')
    }
    
   
    // console.log(result.data);
    return res.status(200).json( result.data.results.books);
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }  

});


router.get('/', async (req, res, next) =>{

  try{
    var result = await axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=oGGpUVmWGXyAqP6AiESGm0rpAJ890oAb');
    // console.log(result.data);
    return res.status(200).json( result.data.results.books);
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }  

});





module.exports = router;
