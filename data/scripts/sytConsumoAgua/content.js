var postURL = "http://localhost/sayet/php/facturaagua.php/rptagua";
var meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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

function getMes(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return meses[+fecarr[1]] + ' de ' + fecarr[0];
    }
    return '';
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    //var params = {"fvencestr":"2017-01-31", "idempresa":""};
    req.data = {
        fecha: formatDate(new Date()), 
        rango: { al: formatDateParam(params.fvencestr), mes: getMes(params.fvencestr) },
        contadores: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fvencestr":"2017-01-31", "idempresa":""},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.contadores = body;
        //req.template.content = JSON.stringify(req.data.contadores);
        //req.template.content = JSON.stringify(params);
        done();
    });
}