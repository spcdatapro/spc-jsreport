var postURL = "http://localhost/sayet/php/rptaguatree.php/rptaguatree";
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
    //var params = {"mes":"8", "anio":"2017"};
    request.data = {
        fechas: formatDate(new Date()),
        generales: {},
        arbol: []
    };
        
    require("request")({
        method:"GET",
        json: true,
        //url: postURL + '/1/2017'
        url: postURL + '/' + params.mes +'/' + params.anio
    }, function(err, response, body){
        request.data.generales = body.generales;
        request.data.arbol = body.contadores;
        //request.template.content = JSON.stringify(body.datos);
        //request.template.content = JSON.stringify(body);
        done();
    });
}