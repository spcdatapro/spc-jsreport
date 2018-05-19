var postURL = "http://localhost/gcf/php/rptlibdia.php/rptlibdia";

function beforeRender(req, res, done) {
    var params = req.data;
    req.data.cuentas = [];
        
    require("request")({
        method:"POST",
        body: params,
        //body: {fdelstr: "2016-09-01", falstr: "2016-12-31", idempresa: 1},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.cuentas = body;
        //req.data.cuentas = JSON.parse(body.substring(1));
        done();
    });
}