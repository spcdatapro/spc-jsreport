var postURL = "http://localhost/sayet/php/facturacion.php/gengface";

function beforeRender(req, res, done) {
      
    var params = req.data;
    req.data = {
        rango: { del: params.fdelstr, al: params.falstr },
        facturas: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr":"2016-12-01", "falstr":"2017-02-28", "idempresa":"4"},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.facturas = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}