var postURL = "http://localhost/gcf/php/rptlibmay.php/rptlibmay";

function beforeRender(req, res, done) {
    var params = req.data;
    request.data.cuentas = [];
        
    require("request")({
        method:"POST",
        body: params,
        //body: {fdelstr: "2016-01-01", falstr: "2016-12-31", idempresa: 1, codigo: "100101"},
        json: true,
        url: postURL
    }, function(err, response, body){
        //request.data.cuentas = body;
        //request.data.cuentas = JSON.parse(body.substring(1));
        if(typeof body == 'string'){
            request.data.cuentas = JSON.parse(body.substring(1));
        }else{
            request.data.cuentas = body;
        }
        done();
    });
    
}