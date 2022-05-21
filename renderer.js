const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { temperatureSettings } = require('./settings/temperatureSettings')
const tableify = require('tableify')
const moment = require('moment')

var port = new SerialPort({ path: 'COM3', baudRate: 9600 })
var parser = new ReadlineParser()
port.pipe(parser)

var sensorData = [];
var chartData = [];

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if (err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }

    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered'
    }

    tableHTML = tableify(ports)
    document.getElementById('ports').innerHTML = tableHTML
  })
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

listPorts();

parser.on('data', function (data) {
  if (data.includes("Temperature")) {
    const temperatureData = { temperature: data.replace('Temperature: ', ''), timestamp: moment().unix() }
    handleNewTemperatureData(temperatureData)
  }
});

port.on('close', function (err) {
  if (err.disconnected === true) {
    reconnect()
  }
});

port.on('resume', function () {
  reconnect()
});

function reconnect() {
  SerialPort.list().then((ports) => {
    if (ports.length > 0) {
      port.open()
    }
  })
  const timeout = setTimeout(reconnect, 2000);
  if (port.isOpen) {
    clearTimeout(timeout)
  }
}

const chart = new ApexCharts(document.querySelector("#chart"), temperatureSettings);
chart.render();

function handleNewTemperatureData(content) {
  sensorData.push(content);
  chart.updateSeries([{
    data: getLatestSeries(sensorData.slice(-1)[0].timestamp, sensorData.slice(-1)[0].temperature)
  }])
}

function getLatestSeries(date, yAxis) {
  chartData.push([date, yAxis]);
  return chartData;
}