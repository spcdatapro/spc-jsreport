var postURL = "http://localhost/sayet/php/rptdetcontdocsbanc.php/detcontdocsbanc";

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
    req.data = { 
        fecha: formatDate(new Date()), 
        documentos: {} 
    };
    
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr":"2017-01-01", "falstr":"2017-01-31", "idbanco":"9"},
        json: true,
        url: postURL 
    }, function(err, response, body){
        req.data.documentos = body;
        //req.template.content = JSON.stringify(req.data.documentos);
        done();
    });
}