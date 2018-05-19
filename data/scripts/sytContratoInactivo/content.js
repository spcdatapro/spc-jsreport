var postURL = "http://localhost/sayet/php/rptcontratoinactivo.php/contrato";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    request.data = {
        generales: {},
        contrato: {}
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: { "idcontrato":"43" },
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.generales = body.generales;
        request.data.contrato = body.contrato;
        done();
    });
}