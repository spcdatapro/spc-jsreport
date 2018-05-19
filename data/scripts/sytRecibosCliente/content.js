var postURL = "http://localhost/sayet/php/rptreccli.php/recibos";

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = { 
        generales: {},
        documentos: []
    };
    
    require("request")({
        method:"POST",
        body: params,
        //body: { "fdelstr":"2017-11-01",	"falstr":"2017-11-30", "idempresa":"", "serie":"", "numdel":"0", "numal":"0" },
        json: true,
        url: postURL 
    }, function(err, response, body){
        req.data.generales = body.generales;
        req.data.documentos = body.recibos;
        //req.template.content = JSON.stringify(body);
        done();
    });
}