
function generateData () {
  var data = []
  for (var i = 0; i < 100; i++) {
    var droneStatus = Math.round(Math.random())
    var el = {
      id: 'foksefpo3',
      name: 'something',
      status: droneStatus ? 'idle' : 'Delivering',
      img: 'http://via.placeholder.com/80x80',
      wallet: '0x34255734545745252',
      balance: 0.4325,
      battery: Math.random(),
      position: [40.714728, -73.998672]
    }

    if (!droneStatus) {
      el.order = {
        target: [-12.231, 10.222],
        description: 'Some order'
      }
    }

    data.push(el)
  }

  return data
}

const data = generateData()

export default {
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
