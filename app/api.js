import axios from "axios"

export default {
  requestFlightData: function(flightQuery) {
    return axios({
    method: 'post',
    url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDDoyulhFz7H1QawrkV-LbqHMeLfWIZCU8',
    data: JSON.stringify(flightQuery),
    headers: {'Content-Type': 'application/json'}
    })
  },
  requestNewsArticles: function() {
    return axios({
    method: 'get',
    url: 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=bfe697619cda4badbdc539c0ffef8dff',
    headers: {'Content-Type': 'application/json'}
    })
  }
}
