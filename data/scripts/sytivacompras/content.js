var postURL = "http://localhost/sayet/php/rptlibrocompras.php/rptlibcomp";
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
    
    if (req.options.isChildRequest){
      return done();
    }
    
    var params = req.data;
    var periodo = {al: params.falstr};
    request.data = {
        fechas: formatDate(new Date()),
        fecha: new Date(), 
        al: periodo.al,
        empresa: {},
        lbcompra: [],
        activo:{ monto: parseFloat(params.montoactivo), referencia: params.refactivo }
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"mes": "8", "anio": "2017", "idempresa": "6"},
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.empresa = body.empresa;
        request.data.lbcompra = body.lbcompra;
        
        done();
    });
}