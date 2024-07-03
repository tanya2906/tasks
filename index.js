const express = require('express')
const app = express()
const path =require('path')
const fs=require('fs'); //fs filesystem
//parsers //to handle data of form in back end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//to use public > image css and file
app.use(express.static(path.join(__dirname,'public')));// __dirname points to the folder "BACKEND"
// render ejs pages
app.set('view engine', 'ejs');
//basic route
app.get('/', function (req, res) {
  //res.send('Hello World')
  fs.readdir('./files',function(err,files){
    //console.log(files);
    res.render('index',{files:files});
  })
  
})
app.get('/files/:filename',function(req,res){
  fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err, fileData){
    res.render('show',{filename: req.params.filename, fileData: fileData});
    //console.log(fileData);
  });
})
app.get('/edits/:filename',function(req,res){
  res.render('edits',{filename:req.params.filename});
});
app.post('/create',function(req,res){
  //console.log(req.body)
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
    res.redirect('/');
  });
})
app.post('/edits',function(req,res){
  //console.log(req.body);
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
    res.redirect('/');
  });
});
/*
app.get('/home',function(req,res){
    res.send('home')
})
*/
/*
app.get('/home/:username',function(req,res){
    res.send(`hey, ${req.params.username}`);// req.params : used for jeske age colon hai ':'
})
*/
app.listen(3000)
