var postURL = "http://localhost/gcf/php/rptintegracli.php/integracli";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    var periodo = {del: params.fdelstr, al: params.falstr};
    request.data = {
        fecha: new Date(), del: periodo.del, al: periodo.al,
        datos: {}
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idcuenta":"32", "idempresa":"1", "fdelstr":"2016-01-01", "falstr":"2016-12-31"},
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.datos = body;
        //request.data.cuentas = JSON.parse(body.substring(1));
        //request.template.content = JSON.stringify(body);
        //request.template.content = JSON.stringify(params);
        done();
    });
}