import React from "react";
import components from "../app/mdlComponents";
import api from "./api";
import moment from "moment";
import FontIcon from 'material-ui/FontIcon';

require("moment-duration-format");


var flights = {
  apiTemplate: {
    request: {
      slice: [
        {
          "origin": "",
          "destination": "",
          "date": "2016-06-22"
        },
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

    var flightDetails = function(res) {
      return res.slice.map(function(segments) {
        return segments.segment.map(function(trip) {
          return (
            <div id="flightDetails">
              <span>{trip.flight.carrier} {trip.flight.number}</span>
              <span>{moment(trip.leg[0].departureTime).format("h:mm a")}</span>
              <span>{trip.leg[0].origin}</span>
              <span>{moment(trip.leg[0].arrivalTime).format("h:mm a")}</span>
              <span>{trip.leg[0].destination}</span>
            </div>
          )
        })
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
            <div className="generalFlightDetails">
              {flightDetails(res)}
            </div>
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
        currentDate: new Date(),
        loadingFlightData: false
      }
    },
    handleInputChange: function(field, event) {
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
      this.setState({loadingFlightData: true})
      var ctrl = this;
      flights.apiTemplate.request.slice[0].origin = this.state.from;
      flights.apiTemplate.request.slice[0].destination = this.state.to;
      flights.apiTemplate.request.slice[0].date = this.state.departDate || moment(this.state.currentDate).format("YYYY-MM-DD");
      flights.apiTemplate.request.slice[1].origin = this.state.to;
      flights.apiTemplate.request.slice[1].destination = this.state.from;
      flights.apiTemplate.request.slice[1].date = this.state.arrivalDate || moment(this.state.currentDate).format("YYYY-MM-DD");

      console.log(flights.apiTemplate)
      api.requestFlightData(flights.apiTemplate)
        .then(function(response) {
          ctrl.props.onClick(response);
          console.log(response)
          ctrl.setState({loadingFlightData:false})
        })
        .catch(function(error) {
          ctrl.setState({loadingFlightData:false})
          console.log(error, "error")
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
                  onChange={this.handleDateChange.bind(this, "departDate")}
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
                  onChange={this.handleDateChange.bind(this, "arrivalDate")}
                  />
              </div>
            <components.ButtonRaised
              onclick = {this.submit}
              disabled = {this.state.loadingFlightData ? true : false}
              label={this.state.loadingFlightData ? <FontIcon className="fa fa-spinner fa-spin"/> : "Search Flights"}
            />
          </form>
        </div>
      )
    }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      flightData: null,
      showMenu: true
    }
  },

  toggleMenuState: function() {
    this.setState({showMenu: !this.state.showMenu});
  },

  updateFlightResults: function(flightData) {
    this.setState({flightData: flightData})
  },
  render: function() {
    console.log(this.state.flightData, "in main")
    return (
      <div id="usHome">
      <components.Header showMenu={this.state.showMenu} toggleMenuState={this.toggleMenuState} title="US Home"/>
        <div id="content" className={this.state.showMenu ? "menuOpen" : ""}>
          <SearchTickets flightData={this.state.flightData} onClick={this.updateFlightResults}/>
          <SearchResults flightData={this.state.flightData}/>
        </div>
      </div>
    );
  }
})