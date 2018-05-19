var postURL = "http://localhost/sayet/php/rptasistelibros.php/asistelibros";

function beforeRender(req, res, done) {
      
    var params = req.data;
    req.data = {
        documentos: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idempresa": 4, "establecimiento": 1, "mes": 8, "anio": 2017},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.documentos = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}