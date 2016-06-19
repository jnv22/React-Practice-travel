import React from "react";
import components from "../app/mdlComponents";
import api from "./api";
import moment from "moment";
require("moment-duration-format");

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

var SearchResults = React.createClass({
  render: function() {
    console.log(this.props, "SearchResults")
    var flightList = this.props.flightData !== null ?
      this.props.flightData.data.trips.tripOption.map(function(res) {
        console.log(moment.duration(res.slice[0].duration, "minutes").format())
        return (
          <li>
            <span>{res.saleTotal}</span>
            <span>{moment.duration(res.slice[0].duration, "minutes").format()}</span>
          </li>
        )
    }) : ""
    return(
      <ul>
        {flightList}
      </ul>
    )
  }
})

var SearchTickets = React.createClass({
    getInitialState: function() {
      return {
        flightData: this.props.flightData,
        currentDate: new Date()
      }
    },
    handleChange: function(field, event) {
      var formState = {};
      formState[field] = event.target.value;
      this.setState(formState)
    },

    submit: function(e) {
      e.preventDefault();
      var ctrl = this;
      flights.apiTemplate.request.slice[0].origin = this.state.from;
      flights.apiTemplate.request.slice[0].destination = this.state.to;
      api.requestFlightData(flights.apiTemplate)
        .then(function(response) {
          ctrl.props.onClick(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    render: function() {
      return (
        <div id = "searchTickets">
          <form>
              <div id="origin">
                <components.InputField
                  onChange={this.handleChange.bind(this, "from")}
                  label="From"
                  id="originInput"
                />
                <components.DatePicker
                  date={this.state.currentDate}
                  />
              </div>
              <div id="destination">
                <components.InputField
                  onChange={this.handleChange.bind(this, "to")}
                  label="To"
                  id="destinationInput"
                />
                <components.DatePicker
                  date={this.state.currentDate}
                  />
              </div>
            <components.ButtonRaised onclick = {this.submit} label="Book Tickets"/>
          </form>
        </div>
      )
    }
});

var usHome = React.createClass({
  getInitialState: function() {
    return {
      flightData: null
    }
  },
  updateFlightResults: function(flightData) {
    console.log(flightData, "UpdateResults");
    this.setState({flightData: flightData})
  },
  render: function() {
    return (
      <div id="usHome">
        <components.Header title="Us Home"/>
        <SearchTickets flightData={this.state.flightData} onClick={this.updateFlightResults}/>
        <SearchResults flightData={this.state.flightData}/>
      </div>
    );
  }
})

export default usHome
