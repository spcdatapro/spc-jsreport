var postURL = "http://localhost/sayet/php/banco.php/rptestcta";

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
    request.data = {
        fecha: formatDate(new Date()), 
        general: {}
    };
        
    require("request")({
        method:"POST",
        //body: params,
        body: {fAl:"2017-07-01T05:59:59.999Z",fDel:"2017-05-01T06:00:00.000Z",falstr:"2017-06-30",fdelstr:"2017-05-01",idbanco:"13",idempresa:6},
        json: true,
        url: postURL
    }, function(err, response, body){
        request.data.general = body
        //req.template.content = JSON.stringify(req.data.general);
        done();
    });
}