var postURL = "http://localhost/gcf/php/rptsaldocliente.php/rptsaldocli";

function beforeRender(req, res, done) {
    var params = req.data;
    req.data.saldos = [];
    req.data.contSaldos = 0;
    
    require("request")({
        method:"POST",
        body: params,
        //body: {fdelstr: "2016-01-01", falstr: "2016-12-31", idempresa: 1},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.saldos = body;
        req.data.contSaldos = req.data.saldos.length + 3;
        done();
    });
}