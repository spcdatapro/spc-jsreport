var postURL = "http://localhost/sayet/php/rptanticliente.php/rptanticli";
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
    
    if (req.options.isChildRequest){
      return done();
    }
    
    var params = req.data;
    var periodo = {al: params.falstr};
    request.data = {
        fechas: formatDate(new Date()),
        fecha: new Date(), 
        al: periodo.al,
        anti: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"al":"2017-11-01T05:59:59.999Z","cliente":{"id": 0},"clistr":"0","del":"2017-10-01T06:00:00.000Z","detalle":"1","falstr":"2017-10-31","idempresa":"4"},
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.anti = body;
        done();
    });
}