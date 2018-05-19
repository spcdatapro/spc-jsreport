var postURL = "http://localhost/gcf/php/rptconciliabco.php/";

function beforeRender(req, res, done) {
    var params = req.data;
    request.data.concilia = {};
    //params.resumido = '1';
    postURL += parseInt(params.resumido) == 1 ? 'rptconciliabcores' : 'rptconciliabco';
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idbanco":"1", "fdelstr":"2016-01-01", "falstr":"2016-02-29", "saldobco":"-735.76"},
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.concilia = body;
        //request.template.content = JSON.stringify(body);
        done();
    });
    
}