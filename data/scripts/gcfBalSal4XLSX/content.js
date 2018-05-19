var postURL = "http://localhost/gcf/php/rptbalancesaldos.php/rptbalsal";

function beforeRender(req, res, done) {
    var params = req.data;
    req.data.cuentas = [];
    req.data.contCuentas = 0;
    
    require("request")({
        method:"POST",
        body: params,
        //body: {fdelstr: "2016-01-01", falstr: "2016-12-31", idempresa: 1},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.cuentas = body;
        //req.data.cuentas = JSON.parse(body.substring(1));
        req.data.contCuentas = req.data.cuentas.length + 3;
        done();
    });
}