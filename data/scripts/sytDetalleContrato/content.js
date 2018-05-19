var getURL = "http://localhost/sayet/php/rptdetallecontrato.php/contratotoprint/";

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

function parseDate(fecha){
    if(fecha == '0'){
        return 'N/A';
    }else{
        if(fecha !== null && fecha !== undefined){
            var fecarr = fecha.split('-');
            return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
        }else{ return 'N/A'; }
    }
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = {
        fecha: formatDate(new Date()),
        contrato: {},
        rango: {del: parseDate(params.delstr), al: parseDate(params.alstr)}
    };
    
    var qstr = params.idcontrato + '/' + params.delstr + '/' + params.alstr + '/' + params.idtiposervicio;
    require("request")({
        method:"GET",
        json: true,
        url: getURL + qstr
        //url: getURL + "72/2013-06-01/2028-05-30/0"
    }, function(err, response, body){
        req.data.contrato = body;
        //req.template.content = JSON.stringify(body);
        done();
    });
}