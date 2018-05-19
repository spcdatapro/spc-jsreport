var getURL = "http://localhost/sayet/php/directa.php/print/";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = {
        generales: {},
        directa: {}
    };
    
    var qstr = params.iddirecta;
    require("request")({
        method:"GET",
        json: true,
        url: getURL + qstr
        //url: getURL + "549"
        //url: getURL + "391"
    }, function(err, response, body){
        req.data.generales = body.generales;
        req.data.directa = body.directa;
        //req.template.content = JSON.stringify(body);
        done();
    });
}