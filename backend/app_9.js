const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const cors = require('cors');

app.use(cors());
// app.get('/',function(req,res){
// 	res.sendFile('/myApp/public/index.html',{root:__dirname});
// });

app.get('/guardian',function(req,res,next){
		request('https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7', { json: true }, (err, resp, body) => {
		  if (err) { return console.log(err); }
		  // console.log(body);
		  res.json(body);
		});
});

app.get('/guardian/:id',function(req,res,next){
	const id = req.params.id;
	// console.log(id)
	request('https://content.guardianapis.com/'+id+'?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all', { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  // console.log(body);
	  res.json(body);
	});
});

app.get('/guardianSearch/:id',function(req,res,next){
	const id = req.params.id;
	// console.log(id)
	request('https://content.guardianapis.com/search?q='+id+'&api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all', { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  // console.log(body);
	  res.json(body);
	});
});

app.get('/keywordTrend/:id',function(req,res,next){
	const id = req.params.id;
	googleTrends.interestOverTime({keyword: id})
	.then(function(results){
	  console.log(results);
	})
	.catch(function(err){
	  console.error(err);
	});
});
// routes:
//world
app.get('/guardianworld',function(req,res,next){
	const url = 'https://content.guardianapis.com/world?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all'
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  // console.log(body);
	  res.json(body);
	});
});


//tech
app.get('/guardiantech',function(req,res,next){
	const url = 'https://content.guardianapis.com/technology?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all'
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  res.json(body);
	});
});

//business
app.get('/guardianbusiness',function(req,res,next){
	const url = 'https://content.guardianapis.com/business?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all'
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  res.json(body);
	});
});

//politics
app.get('/guardianpolitics',function(req,res,next){
	const url = 'https://content.guardianapis.com/politics?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all'
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  res.json(body);
	});
});

//sports
app.get('/guardiansports',function(req,res,next){
	const url = 'https://content.guardianapis.com/sport?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all'
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  res.json(body);
	});
});

app.get('/guardianscience',function(req,res,next){
	const url = 'https://content.guardianapis.com/science?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&show-blocks=all'
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  res.json(body);
	});
});

module.exports = app;