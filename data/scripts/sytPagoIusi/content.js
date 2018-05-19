var postURL = "http://localhost/sayet/php/rptpagoiusi.php/pagosiusi";

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
    req.data = {
        fecha: formatDate(new Date()), 
        pagos: [],
        totiusi: 0.00,
        totapagar: 0.00
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"idempresa":"4", "depto":""},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.pagos = body.activos;
        req.data.totiusi = parseFloat(body.totiusigen).toFixed(2);
        req.data.totapagar = parseFloat(body.totapagargen).toFixed(2);
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}