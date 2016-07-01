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
    url: 'http://content.guardianapis.com/search?tag=world/asia-pacific&api-key=a9796b32-ed68-4a9d-8f0b-5954e9723829',
    headers: {'Content-Type': 'application/json'}

    })
  }
}
