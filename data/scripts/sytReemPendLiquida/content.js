var postURL = "http://localhost/sayet/php/reembolso.php/rptpendliquida";

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
    req.data = {
        fecha: formatDate(new Date()), 
        pendientes: [],
        empresa: {nombre: '', abreviatura: ''},
        rango: {del: '', al: ''}, 
        resumen: {cantidad: 0, sumtotreem: '0.00'}
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idempresa":"6", "fdelstr":"2016-01-01", "falstr":"2017-12-31"},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.empresa.nombre = body.generales.empresa;
        req.data.empresa.abreviatura = body.generales.abreviaempresa;
        req.data.rango.del = body.generales.fdel;
        req.data.rango.al = body.generales.fal;
        req.data.pendientes = body.pendientes;
        req.data.resumen.cantidad = +body.resumen.cantidad;
        req.data.resumen.sumtotreem = body.resumen.sumtotreem;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(req.data);
        done();
    });
}