var chart;
var ctx;
var _textABP = null;
var datasetFet;
var ArrayMesos = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
var chartData = {
    labels: ArrayMesos,
    datasets: [{
        type: 'bar',
        label: 'Catalunya',
        backgroundColor: '#ffffff',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'white',
        borderWidth: 2
    }]

}
var optionsChart = {
    type: 'bar',
    data: chartData,
    options: {
        responsive: false,
        legend: {
            position: 'bottom',
            fullWidth: true,
            labels: {
                boxWidth: 10,
                fontSize: 11,
                fontColor: '#f8f9fa'
            }
        },
        title: {
            display: false,
            text: ''
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        scales: {
            yAxes: [{

                ticks: {
                    beginAtZero: true,
                    fontColor: '#f8f9fa',
                    color: '#f8f9fa',
                }
            }],
            xAxes: [{

                ticks: {
                    color: '#f8f9fa',
                    fontColor: '#f8f9fa'
                }
            }]
        }
    }
};

function initChart() {
    ctx = document.getElementById('canvas').getContext('2d');

    chart = new Chart(ctx, optionsChart);


}


function addLineToChart(ArrayValors, color, textABP) {


    if (_textABP != textABP) {

        //removeData();
        chart.options.animation.duration = 1000;


        chart.data.datasets.forEach((dataset) => {

            if (dataset.type == "line") {
                dataset.label = textABP;
                dataset.data = ArrayValors;
                dataset.borderColor = color,
                    dataset.borderWidth = 2
            }


        });


        chart.update();

        _textABP = textABP;

    }


}


function updateChart(ArrayLabels, ArrayValors, titol, color) {

    removeData();

    var ArrayMesos = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];

    ArrayMesos = ArrayMesos.slice(0, ArrayLabels.length);

    chart.options.animation.duration = 1000;


    chartData = {
        labels: ArrayMesos,
        datasets: [


            {
                type: 'line',
                label: "",
                fill: '#ffffff',
                data: [],
                borderColor: '#ffffff',
                borderWidth: 0
            },
            {
                type: 'bar',
                label: 'Catalunya',
                backgroundColor: color,
                data: ArrayValors,
                borderColor: 'white',
                borderWidth: 1
            }


        ]

    }


    chart.data = chartData;
    chart.update();
   _textABP =null;


}


function removeData() {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}