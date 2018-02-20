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
             <a href={'https://development.test/users/' + this.props.user.username} style={{ width: '100px' }}>{this.props.user.username}</a>
            <span> XP: {this.props.user.xp}</span>
            <span> Currency: {this.props.user.currency}</span>
            <span> Team: {this.props.user.team_name}</span>
            { !invited ? (
              <span className="cooldown"><button className="btn-sm btn-danger" id="user-id" onClick={this.invitePlayerToTeam.bind(this)}>Invite to team</button></span>
            ) : (
              <span className="cooldown">Invited!</span>
            )}
          </li>)
    }
}
