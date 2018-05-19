var postURL = "http://localhost/gcf/php/rptconciliabco.php/";

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
    //params.resumido = '1';
    req.data = { fecha: formatDate(new Date()), concilia: {} };
    
    postURL += parseInt(params.resumido) == 1 ? 'rptconciliabcores' : 'rptconciliabco';
    
    require("request")({
        method:"POST",
        body: params,
        //body: {"idbanco":"1", "fdelstr":"2016-02-01", "falstr":"2016-02-29", "saldobco":"226969.50"},
        json: true,
        url: postURL 
    }, function(err, response, body){
        //req.template.content = typeof body;
        //req.template.content = postURL;
        req.data.concilia = body;
        //req.template.content = typeof req.data.concilia;
        //req.template.content = JSON.stringify(response.headers);
        //req.template.content = JSON.stringify(req.data.concilia);
        done();
    });
    
}