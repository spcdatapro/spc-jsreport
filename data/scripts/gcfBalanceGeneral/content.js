var postURL = "http://localhost/gcf/php/rptbalancegeneral.php/rptbalgen";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    var periodo = {al: params.falstr};
    request.data = {
        fecha: new Date(), al: periodo.al,
        cuentas: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {falstr: "2016-11-30", idempresa: 1, acumulado: 1},
        json: true,
        url: postURL
    }, function(err, response, body){
        //request.data.cuentas = body;
        //request.data.cuentas = body.substring(1);
        //request.data.cuentas = JSON.parse(body.substring(1));
        //request.template.content = JSON.stringify(body);
        if(typeof body == 'string'){
            request.data.cuentas = JSON.parse(body.substring(1));
        }else{
            request.data.cuentas = body;
        }
        done();
    });
    
}