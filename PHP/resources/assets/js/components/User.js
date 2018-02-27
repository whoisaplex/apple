import React, { Component } from 'react';

export default class User extends Component {
  constructor() {
      super();
      this.state = {
          invited: false
      }
  }

    invitePlayerToTeam() {
        axios.post('https://development.test/api/invite', { team_id:globalAuthUser.team_id ,user_id:this.props.user.id, sender_id: globalAuthUser.id })
        .then(response => {
        console.log(response);
        this.setState({invited:true})
        }).catch(err => {
            console.log(err);
        });
    }
     render() {
       const invited = this.state.invited;
         return (
          <li>
             <a href={'https://development.test/users/' + this.props.user.username} style={{ width: '35%' }}>{isNaN(this.props.i) ? null : `${this.props.i+1}.`} {this.props.user.username}</a>
             <div style={{width: '15%'}}>{this.props.user.xp}xp</div>
            <div style={{width: '15%'}}>{this.props.user.currency} <i className="fa fa-bitcoin"></i></div>
            <div style={{width: '25%'}}>Team: {this.props.user.team_name}</div>
            { !invited ? (
                <div style={{width: '10%', textAlign: 'right'}}><i className="fa fa-plus-circle fa-2x" title="Invite to team" style={{color: 'red', cursor: 'pointer'}} id="user-id" onClick={this.invitePlayerToTeam.bind(this)}></i></div>
            ) : (
                <div>Invited!</div>
            )}
          </li>)
    }
}
