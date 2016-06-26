import React from "react";
import components from "../app/mdlComponents";
import api from "./api";
import moment from "moment";
require("moment-duration-format");

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';

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
      console.log(moment(this.state.currentDate).format("YYYY-MM-DD"))
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
      console.log(this.state.loadingFlightData, "state")
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
            <components.ButtonRaised onclick = {this.submit} disabled = {this.state.loadingFlightData ? true : false} label={this.state.loadingFlightData ? "Loading" : "Search Flights"}/>
          </form>
        </div>
      )
    }
});

var usHome = React.createClass({
  MenuViews: [
    {title: "Airfare Lookup", img:"plane", clickEvent: "Some event"},
    {title: "Learn Chinese", img:"book", clickEvent: "Some event"},
    {title: "Articles", img:"newspaper-o", clickEvent: "Some event"},
    {title: "Classifieds", img:"Classifieds", clickEvent: "Some event"}
  ],
  getInitialState: function() {
    return {
      flightData: null
    }
  },
  updateFlightResults: function(flightData) {
    this.setState({flightData: flightData})
  },
  render: function() {
    return (
      <div id="usHome">
        <components.Header title="Us Home"/>
        <components.MenuExampleIcons menu={this.MenuViews}/>
        <SearchTickets flightData={this.state.flightData} onClick={this.updateFlightResults}/>
        <SearchResults flightData={this.state.flightData}/>
      </div>
    );
  }
})

export default usHome
