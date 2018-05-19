var postURL = "http://localhost/gcf/php/rptanticliente.php/rptanticli";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest){
      return done();
    }
    
    var params = req.data;
    var periodo = {al: params.falstr};
    request.data = {
        fecha: new Date(), 
        al: periodo.al,
        anti: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {fdelstr: "2016-01-01", falstr: "2016-12-31", idempresa: 1},
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.anti = body;
        done();
    });
}