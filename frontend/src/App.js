import './App.css';
import React, { Component } from 'react'
import Jokes from './Jokes'

console.log(process.env.NODE_ENV);
let baseUrl = ''

if(process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}

class App extends Component{
  constructor(){
    super()
    this.state = {
      baseUrl: 'https://api.chucknorris.io/jokes/random',
      query: '?catergory=',
      jokeCategories: '',
      searchURL: '',
    }
  }
  handleChange = (event) => {
  this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      searchURL:this.state.baseURL + this.state.query + this.state.jokeCategories
    }, () => {
      fetch(this.state.searchURL)
      .then(response => {
        return response.json()
      }).then(json => this.setState({
        joke: json,
        jokeCategories: '',
      }),
        err => console.log(err))
    })
  }
  render(){
    console.log(this.state);
    console.log(this.state.joke);
    return(
      <>
        <form onSubmit = {this.handleSubmit}>
          <label htmlFor='jokeCategories'>Choose a category</label>
          <Jokes joke={this.state.joke} />
        </form>
      </>
    )
  }
}

export default App;
