var temperatureSettings = {
    series: [{
        name: "Temperature",
        data: []
    }],
    chart: {
        id: 'chart',
        height: 350,
        zoom: {
            enabled: false
        },
    },
    colors: ['#001eff'],
    dataLabels: {
        enabled: true,
    },
    grid: {
        padding: {
            left: 15,
            right: 15
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.2,
            opacityTo: 0.8,
        }
    },
    xaxis: {
        type: 'datetime',
        range: 30,
        title: {
            offsetY: 10
        },
        labels: {
            rotateAlways: true,
            rotate: -30,
            offsetX: 15,
            offsetY: 10,
            formatter: function (value) {
                return new Date(value * 1000).toLocaleTimeString();
            }
        },
    },
    yaxis: {
        opposite: true,
    },
    title: {
        text: 'DHT 11 Sensor',
        align: 'left',
        style: {
            fontSize: '14px',
            color: '#3498DB'
        }
    },
};

module.exports = { temperatureSettings }