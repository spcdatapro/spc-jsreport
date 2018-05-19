var postURL = "http://localhost/sayet/php/rptincdec.php/incdec";

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

function titulo(tipo){
    return +tipo == 1 ? 'INCREMENTOS' : (+tipo == 2 ? 'DECREMENTOS' : 'INCREMENTOS Y DECREMENTOS');
}

function beforeRender(req, res, done) {
    
    if (req.options.isChildRequest)
      return done();
      
    var params = req.data;
    req.data = {
        fecha: formatDate(new Date()), 
        tipo: +params.tipo,
        //tipo: 3,
        IncDecStr: titulo(params.tipo),
        //IncDecStr: titulo(3),
        rango: { del: params.fdelstr, al: params.falstr },
        //rango: { del: "2016-01-01", al: "2020-12-31" },
        incdec: []
    };
        
    require("request")({
        method:"POST",
        body: params,
        //body: {"fdelstr":"2016-01-01", "falstr":"2020-12-31", "tipo":"3"},
        json: true,
        url: postURL
    }, function(err, response, body){
        req.data.incdec = body;
        //req.template.content = JSON.stringify(body);
        //req.template.content = JSON.stringify(params);
        done();
    });
}