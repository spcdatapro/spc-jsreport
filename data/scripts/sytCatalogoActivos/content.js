var postURL = "http://localhost/sayet/php/rptfichaactivo.php/lstactivo";

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
        activos: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idempresa":"", "idtipo":"", "iddepto":"", "id":"", "ffl":""},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.activos = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(req.data);
        done();
    });
}