var postURL = "http://localhost/sayet/php/rptsumario.php/sumario";

function padZero(num){ return num < 10 ? ("0" + num) : num; }

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = padZero(hours) + ':' + padZero(minutes) + ' ' + ampm;
    return padZero(date.getDate()) + "/" + padZero((date.getMonth()+1)) + "/" + date.getFullYear() + "  " + strTime;
}

function fDate(fecha){
    if(fecha !== null && fecha !== undefined){
        var fecarr = fecha.split('-');
        return fecarr[2] + '/' + fecarr[1] + '/' + fecarr[0];
    }
    return;
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = {
        fecha: formatDate(new Date()), 
        rango: { al: fDate(params.fechastr) },
        //rango: { al: fDate("2017-05-02") },
        sumario: {}
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fechastr":"2017-05-02"},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.sumario = body;
        //req.template.content = JSON.stringify(req.data.sumario);
        //req.template.content = JSON.stringify(params);
        done();
    });
}