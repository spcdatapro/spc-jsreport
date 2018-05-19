var getURL = "http://localhost/sayet/php/rptfichacliente.php/clientetoprint/";

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "  " + strTime;
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = {
        fecha: formatDate(new Date()),
        cliente: {}
    };
    
    var qstr = params.idcliente;
    require("request")({
        method:"GET",
        json: true,
        url: getURL + qstr
        //url: getURL + "1"
    }, function(err, response, body){
        req.data.cliente = body;
        //req.template.content = JSON.stringify(body);
        done();
    });
}