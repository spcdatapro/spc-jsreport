var postURL = "http://localhost/gcf/php/rptecuentacli.php/rptecuentacli";

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
        //body: {"falstr":"2016-10-30","detalle":1},
        json: true,
        url: postURL
    }, function(err, response, body){
        //request.template.content = typeof body;
        //request.template.content = JSON.stringify(body);
        
        if(typeof body == 'string'){
            request.data.anti = JSON.parse(body.substring(1));
        }else{
            request.data.anti = body;
        }
        
        done();
    });
}