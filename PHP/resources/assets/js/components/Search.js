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

    search(value) { 
        if (value.length) {
            fetch('https://development.test/api/users/search/?username=' + value)
             .then(response => response.json().then(users => this.setState({ users })))
        } else {
            this.setState({ users: [] })
        }
    }

    onSearch(e){
        const { value } = e.target; 
        clearInterval(this.searchTimeout); 
        this.searchTimeout = setTimeout(()=>{
            this.search(value); 
            console.log(value)
        },300)
    }

    render() {
        const users = this.state.users.map((user, i) => {
            return <User key={i} user={user} />
            }
        )
        return (
          <div>
            <input type="search" placeholder='Search users...' onChange={this.onSearch.bind(this)}  className="form-control" />
            <ul className="search-results">
              {users}
            </ul>
          </div>
          
        );
    }
}

if (document.getElementById('search')) {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
