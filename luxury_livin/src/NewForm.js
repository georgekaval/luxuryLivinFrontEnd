import React, { Component } from 'react'
export default class NewForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            make: '',
            model: '',
            year: '',
            img: '',
            price: '',

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
        // fetch
        fetch(this.props.baseURL + '/luxuryliving', {
            method: 'POST',
            body: JSON.stringify({make: this.state.make}, {model: this.state.model}, {year: this.state.year}, {img: this.state.img}, {price: this.state.price}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json()
        }).then( data => {
            this.props.addCar(data)
            this.setState({
                make: '',
                model: '',
                year: '',
                img: '',
                price: '',

            })
        }).catch (error => console.error({'Error': error}))
    }
    render () {
        console.log(this.state.make)
        return (
           <form onSubmit={ (event) => this.handleSubmit(event) }>
              <label htmlFor="make">Make: </label>
              <input type="text" id="make" name="make" onChange={ (event) => this.handleChange(event) } value={ this.state.make } />
              <label htmlFor="model">Model: </label>
              <input type="text" id="model" name="model" onChange={ (event) => this.handleChange(event) } value={ this.state.model } />
              <label htmlFor="year">Year: </label>
              <input type="text" id="year" name="year" onChange={ (event) => this.handleChange(event) } value={ this.state.year } />
              <label htmlFor="img">Img: </label>
              <input type="text" id="img" name="img" onChange={ (event) => this.handleChange(event) } value={ this.state.img } />
              <label htmlFor="price">Price: </label>
              <input type="text" id="price" name="price" onChange={ (event) => this.handleChange(event) } value={ this.state.price } />
              <input type="submit" value="Add a new car" />
           </form>
        )
    }
}
