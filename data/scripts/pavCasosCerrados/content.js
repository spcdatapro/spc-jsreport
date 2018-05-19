var postURL = "http://localhost/pavalco/php/caso.php/rptcerrados";

function padNum(num){
    if(+num < 10){
        return '0' + num;
    }
    return num;
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return padNum(date.getDate()) + "/" + padNum((date.getMonth()+1)) + "/" + date.getFullYear() + "  " + strTime;
}

function fd(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    /*
    var params = {"fdelstr":"2016-01-01 00:00:00", "falstr":"2016-07-31 23:59:59", 
    "idtecnico":"","idtipocaso":"","idtiposolucion":"6,10,14","idubicacion":"","idtipollamada":"","idfuentecaso":""
    };
    */
    req.data = { 
        fecha: formatDate(new Date()), 
        datos: {}
    };
    
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr":"2016-01-01", "falstr":"2016-12-31"},
        json: true,
        url: postURL 
    }, function(err, response, body){
        req.data.datos = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(req.data.encabezados);
        done();
    });
    
}