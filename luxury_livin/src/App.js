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
      cartItems: [],
      userId: '',

    }
  }

  getCars = () => {
    //fetch to the backend
    fetch(baseURL + '/luxuryliving').then(res => {return res.json()}).then(data => {this.setState({
      cars: data,
    })
  })
  }

getCart = async () => {
  const url = baseURL + '/cart'

  try {
    const res = await fetch(url, { method: 'GET' })
    const cart = await res.json()
    this.setState({
      cart: cart
    })
  } catch(err) {
    console.log('Error: ', err)
  }
}

showModal = (id) => {
  //this can pass id
  console.log(id)
  this.setState( { show: true } )
}

hideModal = () => {
  this.setState( { show: false } )
}

componentDidMount() {
  console.log('...mounting')
  this.getCars()
}


render() {

const cartItems = [
  '1985 Ferrari Testarosta',
  '2020 Aston Martin Superleggera',
  '2020 Bentley Continental GT V8',
  '2020 Ferrari SF90 Stradle'
  ]

  return (
    <div className="App">
        <nav><h3>Log In</h3><h3 onClick={()=>  this.showModal('ID can go here...')}>CART</h3></nav>
        <h1 id='mainHeader'>Luxury Living</h1>
        <h1 id='secondaryHeader'>The Life YOU Want</h1>

        <div className='itemsContainer'>
        {
          this.state.cars.map(car => {
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
                          <td>X</td>
                          <td>edit</td>
                          <td>Add To Cart</td>
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
                cartItems={cartItems}
                />
        </Modal>


    </div>
  );
}


}

export default App;
