var postURL = "http://localhost/sayet/php/rptchequesaprob.php/getcheques";

function beforeRender(req, res, done) {
      
    var params = req.data;
    req.data = {
        cheques: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fechastr":"2016-05-04", "bancos":"1,2,3,4,5,6,7,8,9", "idempresa":"0"},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.cheques = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}