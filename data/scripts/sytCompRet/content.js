var postURL = "http://localhost/sayet/php/compra.php/rptcompisr";
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

    if (req.options.isChildRequest) {
        return done();
    }

    var params = req.data;
    var periodo = {
        al: params.falstr
    };
    request.data = {
        fechas: formatDate(new Date()),
        fecha: new Date(),
        al: periodo.al,
        general: {},
        facturas: []
    };

    require("request")({
        method: "POST",
        body: params,
        //body: { "fdelstr": "2017-08-01", "idempresa": "6", "falstr": "2017-08-31", "cuales": "0", "isrempleados": "643.02", "isrcapital": "20.00" },
        json: true,
        url: postURL
    }, function(err, response, body) {
        request.data.general = body.general;
        request.data.facturas = body.facturas;

        done();
    });
}