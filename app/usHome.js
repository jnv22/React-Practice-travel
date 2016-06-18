import React from "react";
import axios from "axios"
import components from "../app/mdlComponents";


var flights = {
  apiTemplate: {
    request: {
      slice: [
        {
          "origin": "",
          "destination": "",
          "date": "2016-06-22"
        }
      ],
      passengers: {
        "adultCount": 1,
        "infantInLapCount": 0,
        "infantInSeatCount": 0,
        "childCount": 0,
        "seniorCount": 0
      },
      "solutions": 20,
      "refundable": false
    }
  },
  returnedResults: {}
}

var myRequest = function(flightQuery) {
  return axios({
  method: 'post',
  url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDDoyulhFz7H1QawrkV-LbqHMeLfWIZCU8',
  data: JSON.stringify(flightQuery),
  headers: {'Content-Type': 'application/json'}
  })
};

var SearchTickets = React.createClass({
    handleChange: function(field, event) {
      var formState = {};
      formState[field] = event.target.value;
      this.setState(formState)
    },
    
    submit: function(e) {
      e.preventDefault();
      flights.apiTemplate.request.slice[0].origin = this.state.from;
      flights.apiTemplate.request.slice[0].destination = this.state.to;
      myRequest(flights.apiTemplate)
        .then(function(response) {
          flights.returnedResults = response;
        })
    },

    render: function() {
      return (
        <div id = "searchTickets">
          <form>
              <components.InputField
                onChange={this.handleChange.bind(this, "from")}
                label="From"
              />
              <components.InputField
                onChange={this.handleChange.bind(this, "to")}
                label="To"
              />
            <components.ButtonRaised onclick = {this.submit} label="Book Tickets"/>
          </form>
        </div>
      )
    }
});

var usHome = React.createClass({
  render: function() {
    return (
      <div>
        <h4>US HOME</h4>
        <SearchTickets />
      </div>
    );
  }
})

export default usHome
