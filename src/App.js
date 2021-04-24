import './App.css';
import React, { Component } from 'react'

import CartModal from './CartModal'
import GifModal from './GifModal'
import Cart from './Cart'
import Gif from './Gif'
import NewForm from './NewForm'
import NewFormModal from './NewFormModal'


import ModalJoke from './ModalJoke'

import Jokes from './Jokes'



console.log(process.env.NODE_ENV)
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = process.env.REACT_APP_BASEURL // guess I don't need this but I just did it like this bc lesson was like this
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      show: false,

      gifShow: false,
      newFormShow: false,
      giphyBaseURL: 'https://api.giphy.com/v1/gifs/random?tag=',
      tag: 'douchebag',
      gifApiKey: '&api_key=G8YyTky07ZEq5yELqIiipmrfAbVyqEm4',
      gifSearchURL: '',


      showJoke: false,

      cartItems: [], //<---NOT FROM DATA BASE!!
      userId: '', //<---NOT USING THIS RIGHT NOW
      baseJokesUrl: 'https://api.chucknorris.io/jokes/random',
      searchURL: '',
    }
  }

  getCars = () => {
    //fetch to the backend
    fetch(baseURL + '/luxuryliving')
    .then(res => {return res.json()})
    .then(data => {this.setState({
      cars: data,
    })
    })
  }

  showModal = () => {
    this.setState( { show: true } )
  }

  hideModal = () => {
    this.setState( { show: false } )
  }


  showGifModal = () => {
    this.setState( { gifShow: true } )
  }

  hideGifModal = () => {
    this.setState( { gifShow: false } )
  }

  showNewFormModal = () => {
    this.setState( { newFormShow: true } )
  }

  hideNewFormModal = () => {
    this.setState( { newFormShow: false } )
  }

  getGif = () => {

    this.setState({
      gifSearchURL: this.state.giphyBaseURL+this.state.tag+this.state.gifApiKey
    }, ()=> {
      console.log(this.state.gifSearchURL)
      fetch(this.state.gifSearchURL).then(res => {
        return res.json()
        }).then(json => this.setState({
        gif: json.data.images.downsized_large.url
      }), err => console.log(err))
    })
  }

  showJokeModal = () => {
    this.setState( { showJoke: true } )
  }

  hideJokeModal = () => {
    this.setState( { showJoke: false } )

  }

  addToCart = (item) => {
    console.log('addToCart() fired off...')
    console.log(item)

    this.state.cartItems.push(item)
    console.log(this.state.cartItems)
    let cartItems = this.state.cartItems
    this.setState({
      cartItems: cartItems,

    })
      this.showModal()
  }

  removeItem = (item) => {
    console.log('removeItem() fired off...')
    console.log(item.item, item.price)
    item.item = 'REMOVED'
    item.price = 0
    let cartItems = this.state.cartItems
    this.setState({
      cartItems: cartItems
    })
  }




  handleChange = (event) => {
  this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      searchURL:this.state.baseJokesUrl
    }, () => {
      fetch(this.state.searchURL)
      .then(response => {
        return response.json()
      }).then(json => this.setState({
        joke: json,
      }),
        err => console.log(err))
    })
    this.showJokeModal()
  }

// Debbie's code

  addCar = (newCar) => {
      const copyCars = [...this.state.cars]
      copyCars.push(newCar)
      this.setState({
        cars: copyCars,
      })
    }
  // USING ASYNC/AWAIT
  deleteCar = async (id)=> {
    const url = baseURL + "/luxuryliving/" + id
    try{
    const response = await fetch(url, {method: "DELETE"})
    if (response.status === 200){
      const index = this.state.cars.findIndex(car => car._id === id)
      const copyCars = [...this.state.cars]
      copyCars.splice(index, 1)
      this.setState({
        cars: copyCars
        })
      }
    }
    catch(err){
      console.log('error: ', err)
    }
  }

  addLike = async (car) => {
    const url = baseURL + '/luxuryliving/' + car._id
    try{
      const response = await fetch(url, {
        method:"PUT",
        body: JSON.stringify({
          likes: car.likes + 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response.status === 200) {
        const updatedCar = await response.json()
        console.log(updatedCar);
        const index = this.state.cars.findIndex(car => car._id === updatedCar.data._id)
        const copyCars = [...this.state.cars]
        copyCars[index].likes = updatedCar.data.likes
        this.setState({
          cars: copyCars
        })
      }
    }
    catch(err){
      console.log('Error: ', err);
    }
  }


  componentDidMount() {
    console.log('...mounting')
    this.getCars()
  }

  render() {

  console.log(this.state.gif)

    return (
      <div className="App">
          <nav>
            <h3 className='navText' onClick={()=> this.showNewFormModal()}>Create</h3>
            <h3 className='navText'>Log In</h3>
            <h3 className='navText' onClick={
              ()=> {
                this.showGifModal()
                this.getGif()
              }
              }>Free Douchebag Tutorials</h3>
              <form  onSubmit={this.handleSubmit}>
              <h3><input className="jokeButton" onClick={()=>  this.showJokeModal()}
                  type='submit'
                  value= 'Chuck Norris Joke!'
                  onChange={this.handleChange}
                /></h3>
                </form>
            <div id='cartIcon'>
                <h3 onClick={()=>  this.showModal('ID can go here...')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                <span className='navText'>{this.state.cartItems.length}</span>
                </h3>
            </div>
          </nav>

          <h1 id='mainHeader'>Luxury Living</h1>
          <h1 id='secondaryHeader'>The Life YOU Want</h1>


          <NewFormModal show={this.state.newFormShow}>
              <NewForm
               hide={this.hideNewFormModal}
               baseURL={baseURL}
               addCar={this.addCar}
               />
          </NewFormModal>



          <div className='itemsContainer'>
          {
            this.state.cars.map(car => {
              const item = {
                item: car.year + ' ' + car.make + ' ' + car.model,
                price: car.price,
              }

              return(
                <>
                <div key={car._id} className='itemDiv'>
                  <table className='itemTable'>
                    <tbody>
                      <tr>
                        <td>{car.year}</td>
                        <td>{car.make} {car.model}</td>
                        <td>${car.price}</td>
                      </tr>
                    </tbody>
                  </table>
                  <img className='itemImg'src={car.img}/>
                  <table className='itemTable'>
                    <tbody>
                      <tr>
                        <td id='XremoveBtn' onClick={()=> this.deleteCar(car._id)}>x</td>


                        <td> <button id="likeButton" onClick={() =>this.addLike(car)}>Like</button><span> {car.likes}</span></td>
                        <td><button id='addToCartBtn' onClick={()=> this.addToCart(item)}>Add To Cart</button></td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                </>
              )
            })
          }

          </div>

          <CartModal show={this.state.show}>
            <Cart
              cartItems={this.state.cartItems}
              removeItem={this.removeItem}
              hide={this.hideModal}
              />

          </CartModal>

          <GifModal show={this.state.gifShow}>

            <Gif
              getGif={this.getGif}
              gif={this.state.gif}
              hide={this.hideGifModal}/>
          </GifModal>


          <ModalJoke show={this.state.showJoke} >
              {(this.state.joke)
              ? <Jokes
              joke={this.state.joke}
              hide={this.hideJokeModal}/>
              : ''
            }


            </ModalJoke>

      </div>
    );
  }


}

export default App;
