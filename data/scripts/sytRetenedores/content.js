var getURL = "http://localhost/sayet/php/rptretenedores.php/retenedores";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
    
    req.data = {
        retenedores: [],
        generales: {}
    };
    
    require("request")({
        method:"GET",
        json: true,
        url: getURL
    }, function(err, response, body){
        req.data.generales = body.generales;
        req.data.retenedores = body.retenedores;
        //req.template.content = JSON.stringify(body);
        done();
    });
}