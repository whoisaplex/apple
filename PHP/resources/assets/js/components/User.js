import React, { Component } from 'react';

export default class User extends Component {
  constructor() {
      super();
      this.state = {
          invited: false
      }
  }

    invitePlayerToTeam() {
        axios.post('https://laravel.reweb.se/api/invite', { team_id:globalAuthUser.team_id ,user_id:this.props.user.id, sender_id: globalAuthUser.id })
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
             <a href={'https://laravel.reweb.se/users/' + this.props.user.username} style={{ width: '20%' }}>{isNaN(this.props.i) ? null : `${this.props.i+1}.`} {this.props.user.username}</a>
             <div style={{width: '10%'}}>{this.props.user.xp}xp</div>
            <div style={{width: '10%'}}><i className="fa fa-bitcoin"></i>{this.props.user.currency}</div>
            <div style={{width: '20%'}}>Team: {this.props.user.team_name}</div>
            { !invited ? (
                <div><i className="fa fa-plus-circle fa-2x" title="Invite to team" style={{color: 'red', cursor: 'pointer'}} id="user-id" onClick={this.invitePlayerToTeam.bind(this)}></i></div>
            ) : (
                <div>Invited!</div>
            )}
          </li>)
    }
}
