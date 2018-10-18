import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import data from '../../data1.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: data,
    }
    this.search = this.search.bind(this);

  }
componentDidMount(){
  axios.get('http://localhost:1128/repos').then((response) => {
    console.log('*************I MADE IT BACK!', response.data);

    this.setState({repos: response.data});
  })
}
  search (term) {
    console.log(`${term} was searched`);

    axios.post('http://localhost:1128/repos', {username: term,
  headers: {
    'crossDomain': true,
    'Content-Type': 'application/json' 
  }})
      .then((response) => {
        // once sucessful, initiate a get response. 
        console.log(response);
        axios.get('http://localhost:1128/repos').then((response) => {
          console.log('*************I MADE IT BACK!', response.data);

          this.setState({repos: response.data});
          this.forceUpdate();
        })
      })

    // TODO
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));