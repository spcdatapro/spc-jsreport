var postURL = "http://localhost/sayet/php/banco.php/rptestcta";

function padNum(num){ return +num < 10 ? ('0' + num) : num; }

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = padNum(hours) + ':' + minutes + ' ' + ampm;
    return padNum(date.getDate()) + "/" + padNum((date.getMonth()+1)) + "/" + date.getFullYear() + "  " + strTime;
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    //params.resumen = '1';
    req.data = { 
        fecha: formatDate(new Date()), 
        titulo: +params.resumen === 0 ? 'Estado de Cuenta' : 'Resumen por fechas',
        resumen: +params.resumen === 1,
        estcta: {} 
    };
    
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr":"2017-06-01", "falstr":"2017-06-30", "idbanco":"1", "resumen":"1"},
        json: true,
        url: postURL 
    }, function(err, response, body){
        req.data.estcta = body;
        //req.template.content = JSON.stringify(req.data.estcta);
        done();
    });
}