var postURL = "http://localhost/sayet/php/rptestadoresultados.php/rptestres";

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
    //var params = {"fdelstr":"2016-01-01", "falstr": "2016-12-31", "idempresa": "4", "acumulado": "1", "nivel":"7"};
    var periodo = {del: params.fdelstr, al: params.falstr};
    request.data = {
        fechas: formatDate(new Date()),
        fecha: new Date(), del: periodo.del, al: periodo.al,
        acumulado: +params.acumulado == 1,
        //acumulado: false,
        cuentas: [],
        empresa: ''
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr":"2016-01-01", "falstr": "2016-12-31", "idempresa": "4", "acumulado": "1", "nivel":"7"},
        json: true,
        url: postURL
    }, function(err, response, body){
        var respuesta = body;
        request.data.empresa = respuesta.empresa.nomempresa; // + ' (' + respuesta.empresa.abreviatura + ')';
        request.data.cuentas = respuesta.datos;
        //request.data.cuentas = JSON.parse(body.substring(1));
        //request.template.content = JSON.stringify(body);
        done();
    });
    
}