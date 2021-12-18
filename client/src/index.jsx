import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repos from './components/Repos.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    this.getRepos((response) => {
      this.setState({
        repos:response.data
      })
    })
  };

  getRepos(callback) {
    axios.get('/repos')
    .then((response) => {
      callback(response);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.get("/get", term,
    (err, response) => {
      if(err) {
        console.log(err)
      } else {
        this.setState({
          repos: response
        });
      }
  }, text/JSON);
  };

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <Repos repos={this.state.repos}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));