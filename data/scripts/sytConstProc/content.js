var postURL = "http://localhost/sayet/php/rptconstproc.php/rptconstproc";
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
    //var params = {"fdelstr": "2017-01-01", "falstr": "2017-01-31", "idempresa": 4, "codigo": ""}
    var periodo = {del: params.fdelstr, al: params.falstr};
    req.data = {
        fechas: formatDate(new Date()),
        fecha: new Date(), del: periodo.del, al: periodo.al,
        cuentas: [],
        empresa: ""
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr": "2017-08-01", "falstr": "2017-08-31", "idempresa": 4, "codigo": ""},
        json: true,
        url: postURL
    }, function(err, response, body){
        var respuesta;
        if(typeof body == 'string'){
            respuesta = JSON.parse(body.substring(1));
        }else{
            respuesta = body;
        }
        req.data.empresa = respuesta.empresa.nomempresa + '(' + respuesta.empresa.abreviatura + ')';
        req.data.cuentas = respuesta.datos;
        done();
    });
    
}