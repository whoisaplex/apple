import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import User from './User'

export default class Search extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    search(e) {
        console.log(e.target)  
        if (e.target.value.length) {
            fetch('https://development.test/api/users/search/?username=' + e.target.value).then(
            response => response.json().then(users => {
                    this.setState({ users })
              })
            )
        } else {
            this.setState({ users: [] })
        }
    }

    render() {
        const users = this.state.users.map((user, i) => {
            return <User key={i} user={user} />
            }
        )

        return (
          <div>
            <input type="text" onChange={this.search.bind(this)} />
            <ul>
              {users}
            </ul>
          </div>
          
        );
    }
}

if (document.getElementById('search')) {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
