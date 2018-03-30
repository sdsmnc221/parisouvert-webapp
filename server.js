const express  = require('express'),
      app= express(), 
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      request = require('request');
      cors = require('cors');
 
    app.use(morgan('dev'));                                        
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    
    //Set up header
    app.use(cors());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //Set up proxies
    app.get('/api/*', cors(), function(req,res) {
        const params = req.url.slice('/api/'.length);
        request(`https://parisouvert.com/api.php/${params}`).pipe(res);
    });

    app.get('/service', cors(), function(req,res) {
        const params = req.url.slice('/service'.length);
        request(`https://parisouvert.com/api.php/espacevert_service${params}`).pipe(res);
    });

    app.get('/aDj', cors(), function(req,res) {
        request('https://parisouvert.com/api-test.php').pipe(res);
    });

    app.options('/api/*', cors(), function(req,res) {
        const params = req.url.slice('/api/'.length);
        request(`https://parisouvert.com/api.php/${params}`).pipe(res);
    });

    app.options('/service', cors(), function(req,res) {
        const params = req.url.slice('/service'.length);
        request(`https://parisouvert.com/api.php/espacevert_service${params}`).pipe(res);
    });

    app.options('/aDj', cors(), function(req,res) {
        request('https://parisouvert.com/api-test.php').pipe(res);
    });
    
    app.use(express.static('www'));

    app.set('port', process.env.PORT || 5000);
    app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
