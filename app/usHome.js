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
    console.log(this);

    var flightDetails = function(res) {
      console.log(res, "flightDetails")
      return res.slice[0].segment.map(function(trip) {
        return (
          <div id="flightDetails">
            <span>{trip.flight.carrier} {trip.flight.number}</span>
            <span>{trip.leg[0].origin}</span>
            <span>{moment(trip.leg[0].departureTime).format("h:mm a")}</span>
            <span>{trip.leg[0].destination}</span>
            <span>{moment(trip.leg[0].arrivalTime).format("h:mm a")}</span>
          </div>
        )
      })
    };

    var flightList = this.props.flightData !== null ?
      this.props.flightData.data.trips.tripOption.map((res) => {
        return (
          <li className="flightList" key={res.id} >
            <div className="generalFlightInformation">
              <span>{res.saleTotal}</span>
              <span>{moment.duration(res.slice[0].duration, "minutes").format()}</span>
            </div>
            {flightDetails(res)}
          </li>
        )
    }) : ""
    return (
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
    handleInputChange: function(field, event) {
      console.log(field)
      var formState = {};
      formState[field] = event.target.value;
      this.setState(formState)
    },
    handleDateChange: function(field, e, date) {
      date = moment(date).format("YYYY-MM-DD");
      var formState = {};
      formState[field] = date;
      this.setState(formState)
    },
    submit: function(e) {
      e.preventDefault();
      var ctrl = this;
      flights.apiTemplate.request.slice[0].origin = this.state.from;
      flights.apiTemplate.request.slice[0].destination = this.state.to;
      flights.apiTemplate.request.slice[0].date = this.state.date;
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
                  onChange={this.handleInputChange.bind(this, "from")}
                  label="From"
                  id="originInput"
                />
                <components.DatePicker
                  date={this.state.currentDate}
                  onChange={this.handleDateChange.bind(this, "date")}
                  />
              </div>
              <div id="destination">
                <components.InputField
                  onChange={this.handleInputChange.bind(this, "to")}
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
