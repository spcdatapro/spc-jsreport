var postURL = "http://localhost/sayet/php/rptservicios.php/rptservicios";

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "  " + strTime;
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = {
        fecha: formatDate(new Date()), 
        matriz: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idempresa":"6", "idtipo":"", "verbaja":""},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.matriz = body;
        //req.template.content = JSON.stringify(body);
        done();
    });
}