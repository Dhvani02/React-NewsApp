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
		request('https://content.guardianapis.com/search?api-key=65f34abd-4374-4d6c-a01a-30de2950f4f7&section=(sport|business|technology|politics)&show-blocks=all', { json: true }, (err, resp, body) => {
		  if (err) { return console.log(err); }
		  // console.log(body);
		  res.json(body);
		});
});
app.get('/nytimes',function(req,res,next){
	request('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw', { json: true }, (err, resp, body) => {
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


app.get('/nytimes/:id',function(req,res,next){
	const id = req.params.id;
	// console.log(id)
	const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+id+'")&api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw'
	// console.log(url)
	request(url, { json: true }, (err, resp, body) => {
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

app.get('/nytimesSearch/:id',function(req,res,next){
	const id = req.params.id;
	// console.log(id)
	const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+id+'&api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw'
	// console.log(url)
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  // console.log(body);
	  res.json(body);
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

app.get('/nytimesworld',function(req,res,next){
	const url = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw'
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

app.get('/nytimestech',function(req,res,next){
	const url = 'https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw'
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

app.get('/nytimesbusiness',function(req,res,next){
	const url = 'https://api.nytimes.com/svc/topstories/v2/business.json?api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw'
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

app.get('/nytimespolitics',function(req,res,next){
	const url = 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw'
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

app.get('/nytimessports',function(req,res,next){
	const url = 'https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=9BEkAUyqBAzluewruK9BhAGEUalZeDtw'
	request(url, { json: true }, (err, resp, body) => {
	  if (err) { return console.log(err); }
	  res.json(body);
	});
});

module.exports = app;