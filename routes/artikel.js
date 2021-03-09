var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/detail/:val', async (req, res, next) =>{

  try{
    var result = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=oGGpUVmWGXyAqP6AiESGm0rpAJ890oAb');
    var data = result.data.response.docs;
    var searchval = req.params.val;
    var searchData = await data.filter(x => x._id.includes(searchval))



    return res.status(200).json( searchData );
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }  

});

router.get('/search/:val', async (req, res, next) =>{

  try{
    var result = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=oGGpUVmWGXyAqP6AiESGm0rpAJ890oAb');
    var data = result.data.response.docs;
    var searchval = req.params.val;
    var searchData = await data.filter(x => x.abstract.includes(searchval))

    return res.status(200).json( searchData );
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }  

});

router.get('/sort', async (req, res, next) =>{
    try{
      var result = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=oGGpUVmWGXyAqP6AiESGm0rpAJ890oAb');
      
      console.log(req.query.date);

      if(req.query.date === "asc"){
        var data = result.data.response.docs;
        var sortData = await data.sort((a,b) => {
          return new Date(a.pub_date) - new Date(b.pub_date);
        })
      }
      
      if(req.query.date === "des"){
        var data = result.data.response.docs;
        var sortData = await data.sort((a,b) => {
          return new Date(a.pub_date) + new Date(b.pub_date);
        })
      }
     
      return res.status(200).json( sortData );

    }catch(err){
      return res.status(500).json({success:false, message:err.message});
    }
});



router.get('/', async (req, res, next) =>{

  try{
    var result = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=oGGpUVmWGXyAqP6AiESGm0rpAJ890oAb');
    return res.status(200).json( result.data.response.docs );
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }  

});



module.exports = router;
