var postURL = "http://localhost/gcf/php/rptbalancegeneral.php/rptbalgen";

function beforeRender(req, res, done) {
    var params = req.data;
    req.data.cuentas = [];
        
    require("request")({
        method:"POST",
        body: params,
        //body: {falstr: "2016-12-31", idempresa: 1, acumulado: 1},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.cuentas = body;
        //req.data.cuentas = JSON.parse(body.substring(1));
        //request.template.content = JSON.stringify(body);
        done();
    });
    
    //done();
}