import './App.css';
import React, { Component } from 'react'
import Modal from './Modal'
import Cart from './Cart'

console.log(process.env.NODE_ENV)
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'heroku URL' // guess I don't need this but I just did it like this bc lesson was like this
}





class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      show: false,
      cartItems: [], //<---NOT FROM DATA BASE!!
      userId: '', //<---NOT USING THIS RIGHT NOW
      baseUrl: 'https://api.chucknorris.io/jokes/random',
      query: '?catergory=',
      jokeCategories: '',
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



// getCart = async () => {
//   const url = baseURL + '/cart'
//
//   try {
//     const res = await fetch(url, { method: 'GET' })
//     const cart = await res.json()
//     this.setState({
//       cart: cart
//     })
//   } catch(err) {
//     console.log('Error: ', err)
//   }
// }

showModal = () => {
  this.setState( { show: true } )
}

hideModal = () => {
  this.setState( { show: false } )
}

addToCart = (item) => {
  console.log('addToCart() fired off...')
  console.log(item)

  this.state.cartItems.push(item)
  console.log(this.state.cartItems)
  let cartItems = this.state.cartItems
  this.setState({
    cartItems: cartItems
  })
  this.showModal()
}

removeItem = (item) => {
  console.log('removeItem() fired off...')
  console.log(this.state.cartItems.indexOf(item))

  let index = this.state.cartItems.indexOf(item)
  let cartItems = this.state.cartItems
  console.log(cartItems.slice(index, 1))
  let itemToBeRemoved = cartItems.slice(index, 1)
  cartItems.pop(itemToBeRemoved)
  this.setState({
    cartItems: cartItems
  })
}

componentDidMount() {
  console.log('...mounting')
  this.getCars()
}


render() {


  return (
    <div className="App">
        <nav>

          <h3>Log In</h3>
          <div id='cartIcon'>
              <h3 onClick={()=>  this.showModal('ID can go here...')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
              <span>{this.state.cartItems.length}</span>
              </h3>
          </div>
        </nav>

        <h1 id='mainHeader'>Luxury Living</h1>
        <h1 id='secondaryHeader'>The Life YOU Want</h1>

        <div className='itemsContainer'>
        {
          this.state.cars.map(car => {
            const item = {
              item: car.year + ' ' + car.make + ' ' + car.model,
              price: car.price
            }

            return(
              <>
              <div className='itemDiv'>
                  <table className='itemTable'>
                  <tr>
                      <td>{car.year}</td>
                      <td>{car.make} {car.model}</td>
                      <td>${car.price}</td>
                  </tr>
                  </table>
                  <img className='itemImg'src={car.img}/>
                  <table className='itemTable'>

                      <tr>
                          <td id='XremoveBtn'>X</td>
                          <td>edit</td>
                          <td onClick={()=> this.addToCart(item)}>Add To Cart</td>
                      </tr>
                  </table>

              </div>
              </>
            )
          })
        }

        </div>

        <Modal show={this.state.show} hide={this.hideModal}>
                <Cart
                cartItems={this.state.cartItems}
                removeItem={this.removeItem}
                />
        </Modal>


    </div>
  );
}


}

export default App;
