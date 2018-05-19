var postURL = "http://localhost/gcf/php/rptecuentaprov.php/rptecuentaprov";

function beforeRender(req, res, done) {
    var params = req.data;
    req.data.saldos = [];
    req.data.contSaldos = 0;
    
    require("request")({
        method:"POST",
        body: params,
        //body: {falstr: "2016-12-31", idempresa: 1,detalle:1},
        json: true,
        url: postURL
    }, function(err, response, body){

        //console.log(request.data.saldos);
        if(typeof body == 'string'){
            request.data.saldos = JSON.parse(body.substring(2));
        }else{
            request.data.saldos = body;
        }
        //req.data.saldos = body;
        req.data.contSaldos = req.data.saldos.length + 3;
        done();
    });
}