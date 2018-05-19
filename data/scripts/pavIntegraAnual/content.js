var postURL = "http://localhost/pavalco/php/rptintegracion.php/rptintegra";

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
      
    var params = req.data;
    req.data = { 
        fecha: formatDate(new Date()), 
        rep: {} 
    };
    
    require("request")({
        method:"POST",
        body: params,
        json: true,
        url: postURL 
    }, function(err, response, body){
        //req.template.content = typeof body;
        //req.template.content = postURL;
        req.data.rep = body;
        //req.template.content = typeof req.data.concilia;
        //req.template.content = JSON.stringify(response.headers);
        //req.template.content = JSON.stringify(req.data.concilia);
        done();
    });
    
}