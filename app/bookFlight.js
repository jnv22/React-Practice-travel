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

const SearchResults = React.createClass({
  render: function() {

     const flightSegments = function(segments) {
      return segments.segment.map(function(segment) {
        return (
          <li className="segment">
            <span>{segment.flight.carrier} {segment.flight.number}</span>
            <span>{moment(segment.leg[0].departureTime).format("h:mm a")}</span>
            <span>{segment.leg[0].origin}</span>
            <span>{moment(segment.leg[0].arrivalTime).format("h:mm a")}</span>
            <span>{segment.leg[0].destination}</span>
          </li>
        )
      })
    }

    const flightDetails = function(res) {
      return res.slice.map(function(segments) {
        return (
            flightSegments(segments)
          )
        })
    };

    const flightList = this.props.flightData !== null ?
      this.props.flightData.data.trips.tripOption.map((res) => {
        return (
          <components.Paper>
            <li className="flightList" key={res.id} >
              <div className="FlightInformation">
                <span>{res.saleTotal} </span>
                <span>{moment.duration(res.slice[0].duration, "minutes").format()}</span>
              </div>
              <ul className="FlightDetails">
                {flightDetails(res)}
              </ul>
            </li>
          </components.Paper>
        )
    }) : "";

    return (
      <ul>
        {flightList}
      </ul>
    )
  }
})

const SearchTickets = React.createClass({
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
        flightData: null
      }
    },

    updateFlightResults: function(flightData) {
      this.setState({flightData: flightData})
    },

    render: function() {
      var showMenu = this.props.state.showMenu

      return (
        <div id="usHome">
        <components.Header showMenu={showMenu} toggleMenuState={this.props.toggleMenuState} title="US Home"/>
        <components.Drawer showMenu={showMenu} onClick={this.props.toggleMenuState}/>
          <div id="content" className={showMenu ? "menuOpen" : ""}>
            <SearchTickets flightData={this.state.flightData} onClick={this.updateFlightResults}/>
              <div id="flightDetails">
            <SearchResults flightData={this.state.flightData}/>
              </div>
          </div>
        </div>
      );
    }
  })
