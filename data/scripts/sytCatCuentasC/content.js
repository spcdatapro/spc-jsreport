var getURL = "http://localhost/sayet/php/rptcuentascontables.php/catalogo/";
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
        fechas: formatDate(new Date()),
        generales: {},
        cuentas: []
    };
    
    var qstr = params.idempresa;
    require("request")({
        method:"GET",
        json: true,
        url: getURL + qstr
        //url: getURL + "4"
    }, function(err, response, body){
        req.data.generales = body.generales;
        req.data.cuentas = body.cuentas;
        //req.template.content = JSON.stringify(body);
        done();
    });
}