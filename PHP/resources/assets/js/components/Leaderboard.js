import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import User from './User'

export default class Leaderboard extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        fetch('https://development.test/api/users').then(
            response => response.json().then( users => this.setState({users}) )
        )

    }

    render() {
        const users = this.state.users.map((user, i) => {
            return <User key={i} user={user} />
            }
        )

        return (
          <section>
            <div className="grid-flex space width-100 text-align-center">
              <div className="col-flex-1">
                <div className="panel panel-default">
                <div className="panel-heading">
                  <h3>
                    <i className="fa fa-user" aria-hidden="true"></i> Top players
                  </h3>
                </div>
                <div className="panel-body">
                  <ol id="user-positions">
                    {users}
                  </ol>
                </div>
              </div>
              </div>
            </div>
          </section>
        );
    }
}

if (document.getElementById('main-content')) {
    ReactDOM.render(<Leaderboard />, document.getElementById('main-content'));
}
