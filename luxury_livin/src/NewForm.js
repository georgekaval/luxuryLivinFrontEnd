import React, { Component } from 'react'
export default class NewForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            make: '',
            model: '',
            // year: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange (event) {
        // console.log(event.target.value)
        this.setState({ [event.target.id]: event.target.value })
    }
    handleSubmit (event) {
        event.preventDefault()
        console.log(this.props.baseURL)
        fetch(this.props.baseURL + '/luxuryliving', {
            method: 'POST',
            body: JSON.stringify({make: this.state.make}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json()
        }).then( data => {
            console.log(data)
            this.props.addCar(data)
            this.setState({
                make: '',
                model: ''
            })
        }).catch (error => console.error({'Error': error}))
    }
    render () {
        console.log(this.state.make)
        return (
          <div className='modal-newForm'>
            <div className='.formContainer'>
               <form onSubmit={ (event) => this.handleSubmit(event) }>
                  <label htmlFor="make">Make: </label>
                  <input type="text" id="make" name="make" onChange={ (event) => this.handleChange(event) } value={ this.state.make } />
                  <label htmlFor="model">Model: </label>
                  <input type="text" id="model" name="model" onChange={ (event) => this.handleChange(event) } value={ this.state.model } />
                  <input type="submit" value="Add a new car" />
               </form>
               <button id='closeBtn' type="button" onClick={this.props.hide}>X</button>
            </div>
          </div>
        )
    }
}
