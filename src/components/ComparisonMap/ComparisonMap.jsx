import React, { Component } from 'react';
import USAMap from "react-usa-map";
import 'bootstrap/dist/css/bootstrap.min.css';

export class ComparisonMap extends Component {
  state = {
    width: window.innerwidth,
    height: window.innerheight
  }

  mapHandler = (event) => {
    const stateAbbrev = event.target.dataset.name
    const matchingState = this.props.states.find(state => state.state === stateAbbrev)
    
    this.props.updateDashboardState(matchingState.abortion_clinics, matchingState.crisis_pregnancy_centers, matchingState.name, matchingState.waiting_period, matchingState.high_risk);
  };
 
  render() {
    return (
      <USAMap className="usaMap" width={this.state.width / 1.2} height="400" viewBox="0 0 20 10" title="Abortion Clinics in the US"onClick={this.mapHandler} />
      );
    }
  }
 
export default ComparisonMap;