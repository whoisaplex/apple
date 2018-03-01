import React, { Component } from 'react'; 
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 

import LeaderBoard from './Leaderboard'; 
import Search from './Search'; 

/* 
** Gets the global user and that users
** postions array from db */ 
const GLOBAL_USER = window.globalUser
GLOBAL_USER.positions = window.globalPositions; 

export default class InGameProfile extends Component {

    constructor(){
        super(); 
        this.state = {
            user: {},
            positions: GLOBAL_USER.positions, 
        }; 
    }

    componentWillMount(){
        fetch('https://development.test/api/users/search?username=' + GLOBAL_USER.username)
         .then(res => res.json().then(me => {
             console.log(me[0]); 
             this.setState({user: Object.assign({}, me[0])}); 
        }))
         .catch(err => console.log(err))
    }

    render(){
        const positions = this.state.positions
         .map((pos, i) => <HackedPosition key={i} name={pos.name} created_at={pos.created_at} /> )
        console.log(this.state); 
        return(
            <div style={{background: 'black', padding: '1em', marginBottom: '7vh'}}>
                <UserProfile user={this.state.user}/>
                <Router>
                    <div>
                        <nav style={{display: 'flex', justifyContent: 'space-around', paddingBottom: '.7em'}}>
                            <Link style={{color: '#19ff00'}} to={'/game'}>History</Link>
                            <Link style={{color: '#19ff00'}} to={'/game/team'}>Team</Link>
                            <Link style={{color: '#19ff00'}} to={'/game/leaderboard'}>Leaderboard</Link>
                        </nav>
                        <Route exact path={'/game'} 
                               render={ (props) => <HackingHistory>{positions}</HackingHistory> } />
                        <Route exact path={'/game/team'} 
                               render={ (props) => <TeamProfile teamName={this.state.user.team_name} /> } />
                        <Route exact path={'/game/leaderboard'} 
                               render={ (props) => <LeaderBoard/> } />
                    </div>
                </Router>
            </div>
        )
    }
}


const HackingHistory = (props) => {
    return (
        <div className="grid-flex space width-100 text-align-center">
            <div className="col-flex-2">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3>
                            <i className="fa fa-globe" aria-hidden="true"></i> 
                            Hacking history</h3>
                    </div>
                    <div className="panel-body">
                        <ol id="user-positions">
                            {props.children}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HackedPosition = ({name, created_at}) => {
    return (
        <li>
            {name} 
            <span className="cooldown">{created_at}</span>
        </li>
    )
}

const UserProfile = (props) => {
    return (
            <section id="profile-header">
                <div id="user-avatar">
                    <img src="img/user-avatar.jpg"/>
                </div>
                <div id="user-id-container">
                    <div id="user-id">
                        {props.user.username}
                    </div>
                    <div id="user-team">
                        {props.user.team_name}
                    </div>
                    <div id="user-level">
                        <div>{props.user.level}</div>
                    </div>
                    <div id="user-cash">{props.user.currency}
                        <i className="fa fa-bitcoin"></i>
                    </div>
                </div>

                <div id="user-xp">
                    <progress value={props.user.xp} max="100"></progress>
                </div>
            </section>
    )
}

const TeamProfile = ({teamName}) => 
    <div className="container">
        <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <div className="panel panel-default">
                    <div className="panel-heading">Team</div>
                    <div className="panel-body">
                    <h1 style={{ color:'red', textAlign: 'center' }}>
                        {teamName}
                    </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

if(document.getElementById('menu-site')) {
    ReactDOM.render(<InGameProfile/>, document.getElementById('menu-site')); 
}