import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import gyn from "assets/img/gyn.svg"
import bible from "assets/img/bible.svg"
import calendar from "assets/img/calendar.svg"
import female from "assets/img/female.svg"
import { Card } from "components/Card/Card.jsx";
import { ComparisonMap } from "components/ComparisonMap/ComparisonMap.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

const clinicData = require('variables/data.json');

class Dashboard extends Component {
  state = {
    abortionClinics: "",
    crisisPregnancyCenters: "",
    waitingPeriod: "",
    risk: "",
    currentState: "The United States",
    states: []
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  updateDashboardState = (abortionClinics, crisisPregnancyCenters, currentState, waitingPeriod, risk) => {
    this.setState(() => ({ abortionClinics: abortionClinics }));
    this.setState(() => ({ crisisPregnancyCenters: crisisPregnancyCenters }));
    this.setState(() => ({ currentState: currentState }));
    this.setState(() => ({ waitingPeriod: waitingPeriod }));
    this.setState(() => ({ risk: risk }));
  }

  componentDidMount() {
    this.setState(() => ({ states: clinicData }));
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<img width="50" src={gyn} />}
                statsText="Count:"
                statsValue={this.state.abortionClinics}
                statsIconText="Abortion Clinics"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<img width="50" src={bible} />}
                statsText="Count:"
                statsValue={this.state.crisisPregnancyCenters}
                statsIconText="Crisis Pregnancy Centers"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<img width="50" src={calendar} />}
                statsText="Response:"
                statsValue={this.state.waitingPeriod}
                statsIconText="Mandatory waiting period?"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<img width="50" src={female} />}
                statsText="Response:"
                statsValue={this.state.risk}
                statsIconText="High risk of abortion ban?"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card class="mapCard"
                id="chartHours"
                stateTitle={this.state.currentState}
                stats="Select your state to see how it compares in abortion rights and access"
                content={
                  <div >
                    <ComparisonMap 
                      states={this.state.states}
                      updateDashboardState={this.updateDashboardState}
                    />
                  </div>
                }
                
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
