import React, { Component } from 'react';
import USAMap from "react-usa-map";
import stateAbbreviations from 'states-abbreviations';
import 'bootstrap/dist/css/bootstrap.min.css';

export class ComparisonMap extends Component {
  state = {
    abortionClinic: 633,
    fakeClinic: 4146,
    currentState: "the US",
    width: window.innerwidth,
    height: window.innerheight
  }

  mapHandler = (event) => {
    const stateAbbrev = event.target.dataset.name
    const matchingState = this.props.states.find(state => state.state === stateAbbrev)
    const fullStateName = stateAbbreviations[stateAbbrev];
  
    this.setState(() => ({ currentState: fullStateName }))
    this.setState(() => ({ abortionClinic: matchingState.abortion_clinics }));
    this.setState(() => ({ fakeClinic: matchingState.crisis_pregnancy_centers }));
  };
 
  render() {
    return (
      <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8">
              <USAMap className="usaMap" width={this.state.width / 1.2} height={this.state.height/2} title="Abortion Clinics in the US"onClick={this.mapHandler} />
            </div>
          
            <div className="col-12 col-md-4 col-lg-4 center-block">
              <div className="clinics"> 
                <img className="icon" src="/../images/gyn.svg" /> 
                <br/>
                Number of Abortion Clinics in {this.state.currentState}:
                <span className="count"> 
                  {this.state.abortionClinic} 
                </span> 
              </div>
              <br/>

              <div className="non-clinics">
                <img className="icon" src="/../images/bible.svg" /> 
                <br/>
                Number of Crisis Pregnancy Centers in {this.state.currentState}:
                <span className="count"> 
                  {this.state.fakeClinic}
                </span>   
              </div>
            </div>

          </div>
          <div className="credit">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </div>
      );
    }
  }
 
export default ComparisonMap;