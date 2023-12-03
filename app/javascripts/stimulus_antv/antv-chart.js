//import { Line } from '@antv/g2plot'

const chart = document.getElementById('chart')
const url = chart.dataset.url
const params = new URLSearchParams(location.search.substring(1))

fetch(url, {
  headers: {
    'Accept': 'application/json'
  }
}).then((res) => res.json()).then((data) => {
  const linePlot = new Line('chart', {
    data,
    xField: params.get('x_field'),
    yField: params.get('column')
  })
  linePlot.render()
})

