import React, { Component } from 'react';

export default class User extends Component {
    invitePlayerToTeam() {
        axios.post('https://development.test/api/invite', { team_id:globalAuthUser.team_id ,user_id:this.props.user.id, sender_id: globalAuthUser.id })
        .then(response => {
        console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }
     render() {
         return (<li>
            <a href={'https://development.test/users/' + this.props.user.username}>{this.props.user.username}</a>
            <span> {this.props.user.xp}</span>
             <span> {this.props.user.currency}</span>
             <span> Team: {this.props.user.team_name}</span> 
             <span className="cooldown"><button className="btn-sm btn-danger" id="user-id" onClick={this.invitePlayerToTeam.bind(this)}>Invite to team</button></span>

        </li>)
    }
}
