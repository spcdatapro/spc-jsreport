var postURL = "http://localhost/sayet/php/facturacion.php/proyfact";

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
    //var params = {"fdelstr":"2017-11-01", "falstr":"2017-11-30", "empresa":"", "proyecto":"", "tc":""};
    req.data = {
        fecha: formatDate(new Date()), 
        rango: { fdel:formatDateParam(params.fdelstr), fal: formatDateParam(params.falstr)},
        tasa: params.tc,
        traetc: params.tc !== '',
        proyeccion: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr":"2018-11-01", "falstr":"2017-11-30", "empresa":"", "proyecto":"", "tc":""},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.proyeccion = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}