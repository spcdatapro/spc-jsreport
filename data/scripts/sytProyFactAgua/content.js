var postURL = "http://localhost/sayet/php/facturaagua.php/proyeccion";
var meses = ['', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

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

function formatDateParam(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return '';
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    //var params = {"fvencestr":"2017-08-31", "idempresa":"7", "empresastr":"EMPRESA TURISTICA, S.A."};
    req.data = {
        fecha: formatDate(new Date()), 
        rango: { al: formatDateParam(params.fvencestr) },
        empresa: params.empresastr,
        contadores: [],
        totales: {}
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fvencestr":"2017-08-31", "idempresa":"7", "empresastr":"EMPTRESA TURISTICA, S.A."},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.contadores = body.contadores;
        req.data.totales = body.totales;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}