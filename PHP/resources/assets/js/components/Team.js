import React, { Component } from 'react';

export default class Team extends Component {

     render() {
         return (
          <li>
            <div style={{width: '20%'}}> {this.props.team.name} </div>
            <div style={{width: '10%'}}>{this.props.team.xp}xp</div>
            <div style={{width: '10%'}}>{this.props.team.currency} <i className="fa fa-bitcoin"></i></div>
          </li>)
    }
}
