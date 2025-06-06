const ctxTemp = document.getElementById('grafico-temperatura');
new Chart(ctxTemp, {
    type: 'line',
    data: {
        labels: ['04h','06h', '08h', '10h', '12h', '14h', '16h', '18h','20h','22h'],
        datasets: [{
            label: '',
            data: [20, 18, 20, 23, 29, 25, 23, 20, 21, 23],
            backgroundColor: 'transparent',
            tension: 0.4,
            pointBackgroundColor: '#0cc0df',
            borderColor: '#0cc0df'
        }]
    },
    options: {
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#000',
                font: { weight: 'bold', size: 12 },
                formatter: Math.round
            }
        },
        interaction: { mode: 'index' },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Horário do dia',
                    color: '#000',
                    font: { size: 10, weight: 'bold' }
                },
                ticks: { color: '#000', font: { size: 12 } },
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 40,
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                    color: '#000',
                    font: { size: 10, weight: 'bold' }
                },
                ticks: { stepSize: 10, color: '#000', font: { size: 12 } },
                grid: { color: 'rgba(0,0,0,0.05)' },
            }
        }
    },
    plugins: [ChartDataLabels]
});

const ctxUmid = document.getElementById('grafico-umidade');
new Chart(ctxUmid, {
    type: 'line',
    data: {
        labels: ['04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
        datasets: [{
            label: '',
            data: [42, 43, 43, 44, 45, 45, 44, 45, 41, 43],
            backgroundColor: 'transparent',
            tension: 0.4,
            pointBackgroundColor: '#0cc0df',
            borderColor: '#0cc0df'
        }]
    },
    options: {
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                align: 'top',
                anchor: 'end',
                color: '#000',
                font: { weight: 'bold', size: 12 },
                formatter: Math.round
            }
        },
        interaction: { mode: 'index' },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Horário do dia',
                    color: '#000',
                    font: { size: 10, weight: 'bold' }
                },
                ticks: { color: '#000', font: { size: 12 } },
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 70,
                title: {
                    display: true,
                    text: 'Umidade (%)',
                    color: '#000',
                    font: { size: 10, weight: 'bold' }
                },
                ticks: { stepSize: 10, color: '#000', font: { size: 12 } },
                grid: { color: 'rgba(0,0,0,0.05)' }
            }
        }
    },
    plugins: [ChartDataLabels]
});


function gerarValorAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// variavel para acessar cada grafico
var chartTemperatura = Chart.getChart('grafico-temperatura');
var chartUmidade = Chart.getChart('grafico-umidade');

// Atualiza os gráficos a cada 2 segundos
setInterval(function () {
    // for para geracao de 10 novos valores para cada gráfico
    var novosValoresTemp = [];
    var novosValoresUmid = [];
    for (var index = 0; index < 10; index++) {
        // aqui coloquei o liminite minimo e maximo dentro do normal para cada sensor
        novosValoresTemp.push(gerarValorAleatorio(18, 27));
        novosValoresUmid.push(gerarValorAleatorio(40, 60));
    }

    // Atualiza dados de temperatura
    chartTemperatura.data.datasets[0].data = novosValoresTemp;
    chartTemperatura.update();

    // o grafico comeca com os valores ja setados e depois ele pega por aqui os novos 10 valores
    chartUmidade.data.datasets[0].data = novosValoresUmid;
    chartUmidade.update();
}, 2000);

