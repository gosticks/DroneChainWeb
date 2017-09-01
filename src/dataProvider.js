
const api = {
  NEW_BOOKING: 'http://iotwist.com:8200/api/booking/new'
}

export const FakeData = {
  drone: '0x00928C4Ce6be59B078350a548E739D5086FEf872',
  station: '0xE37497Fa54C4D7AF837AFBfEb798a5f8bEb5140D',
  destionationLoc: [8.738126, 50.140054],
  stationLoc: [8.696878, 50.152152],
  droneLoc: [8.644237, 50.198657],
  points: {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [8.696878, 50.152152]
        },
        'properties': {
          'title': 'Charger',
          'icon': 'bolt'
        }
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [8.738126, 50.140054]
        },
        'properties': {
          'title': 'Target',
          'icon': 'marker'
        }
      }]
    }
  },
  route: {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'coordinates': [
          [
            8.644268,
            50.198737
          ],
          [
            8.696859,
            50.152251
          ],
          [
            8.73815,
            50.140135
          ]
        ],
        'type': 'LineString'
      }
    }
  }
}

function generateData () {
  var data = []
  for (var i = 0; i < 100; i++) {
    var droneStatus = Math.round(Math.random())
    var el = {
      id: '8350a548E739D5086FEf872' + i,
      name: 'something',
      status: droneStatus ? 'idle' : 'Delivering',
      img: 'static/img/drone_' + (Math.round(Math.random() * 3) + 1) + '.png',
      wallet: '0x34255734545745252',
      balance: 0.4325 + (Math.round(Math.random() * 0.700)),
      battery: Math.random(),
      position: FakeData.droneLoc // [40.714728, -73.998672]
    }

    if (!droneStatus) {
      el.order = {
        target: FakeData.destionationLoc,
        description: 'Some order'
      }
    }

    data.push(el)
  }
  console.error(data)
  return data
}

const data = generateData()

export const PostNewBooking = function (droneID, stationID, callback) {
  var xhr = new XMLHttpRequest()
  var url = api.NEW_BOOKING
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.debug('Added new booking for drone', droneID)
      callback()
      // var json = JSON.parse(xhr.responseText)
    } else {
      console.error('Failed to create new booking', xhr)
    }
  }

  var data = JSON.stringify({'droneID': droneID, 'stationID': stationID})
  xhr.send(data)
}

export const Data = {
  drones: data,
  getDroneById: function (id) {
    for (let drone of this.drones) {
      if (drone.id === id) {
        console.debug('Found drone', drone)
        return drone
      }
    }
  }
}
