var postURL = "http://localhost/sayet/php/serviciopropio.php/rptagua";
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

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    //var params = {"mes":"1", "anio":"2017"};
    req.data = {
        fecha: formatDate(new Date()), 
        rango: { mes: meses[+params.mes], anio: params.anio},
        contadores: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"mes":"1", "anio":"2017"},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.contadores = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}