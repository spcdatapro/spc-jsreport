var postURL = "http://localhost/sayet/php/rptlibdia.php/rptlibdia";
function padZero(num){ return num < 10 ? ("0" + num) : num; }

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = padZero(hours) + ':' + padZero(minutes) + ' ' + ampm;
    return padZero(date.getDate()) + "/" + padZero((date.getMonth()+1)) + "/" + date.getFullYear() + "  " + strTime;
}
function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    var periodo = {del: params.fdelstr, al: params.falstr};
    request.data = {
        fechas: formatDate(new Date()),
        fecha: new Date(), del: periodo.del, al: periodo.al,
        cuentas: [],
        empresa: {}
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idempresa":"4", "fdelstr":"2017-08-01", "falstr":"2017-08-31"},
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.empresa = body.empresa;
        request.data.cuentas = body.ld;
        //request.data.cuentas = JSON.parse(body.substring(1));
        //request.template.content = JSON.stringify(body);
        //request.template.content = JSON.stringify(params);
        done();
    });
}