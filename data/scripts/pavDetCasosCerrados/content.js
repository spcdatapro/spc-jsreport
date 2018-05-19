var postURL = "http://localhost/pavalco/php/caso.php/lstcerrados";

function beforeRender(req, res, done) {
    
    var params = req.data;
    req.data = {
        casos: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {  },
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.casos = body;
        done();
    });
    
}