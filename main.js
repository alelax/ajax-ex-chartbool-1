$(document).ready(function() {

    $.ajax({
        url: 'http://138.68.64.12:3019/sales',
        method: 'GET',
        success: function(data)
        {
            printLineChart(data);

            printPieChart(data);
        },
        error: function()
        {
            alert('Si è verificato un errore');
        }
    });

});

function printPieChart(vendite)
{
    var dati = getDataForPieChart(vendite);

    var ctx = $('#pie');

    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: dati.labels,
            datasets: [{
                data: dati.data,
            }]
        }
    });
}

function getDataForPieChart(vendite)
{
    var fatturatoTotale = 0;
    var venditori = {};

    for (var i = 0; i < vendite.length; i++) {
        var vendita = vendite[i];
        var venditore = vendita.salesman;

        if (!venditori[venditore]) {
            venditori[venditore] = 0;
        }

        venditori[venditore] += vendita.amount;

        fatturatoTotale += vendita.amount;
    }

    var dati = {
        labels: [],
        data: []
    };

    for (var chiaveVenditore in venditori) {
        var percentualeVenditeVenditore = (venditori[chiaveVenditore] * 100) / fatturatoTotale;

        dati.labels.push(chiaveVenditore);
        dati.data.push(percentualeVenditeVenditore);
    }

    return dati;
}

function printLineChart(vendite)
{
    var dati = getDataForLineChart(vendite);

    var ctx = $('#line');

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dati.labels,
            datasets: [{
                data: dati.data,
            }]
        }
    });
}

function getDataForLineChart(vendite)
{
    var mesi = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
    };

    for (var i = 0; i < vendite.length; i++) {
        var vendita = vendite[i];
        var dataDellaVendita = moment(vendita.date, 'DD-MM-YYYY');
        var meseDellaVendita = dataDellaVendita.format('M');

        mesi[meseDellaVendita] += vendita.amount;
    }

    var dati = {
        labels: [],
        data: []
    };

    for (var chiaveMese in mesi) {
        dati.labels.push(chiaveMese);
        dati.data.push(mesi[chiaveMese]);
    }

    return dati;

}
