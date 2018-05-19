//var postURL = "http://localhost/sayet/php/facturacion.php/pendientes";
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
function setParams(params){
    var param = params.split('-');
    return {
        empresa: param[0],
        vence: param[1],
        ffact: param[2],
        tc: param[3],
        facturar: param[4]
    };
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = {
        fechas: formatDate(new Date()),
        fecha: new Date(), 
        datos: setParams(params.pendientes[0].paramstr),
        pendientes: params.pendientes
    };
    
    done();
    
    /*
    require("request")({
        method:"POST",
        body: params,
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.pendientes = body;
        req.data.datos = setParams(req.data.pendientes[0].paramstr);
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
    */
}