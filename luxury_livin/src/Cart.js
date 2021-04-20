import './App.css'



const Cart = (props) => {


// this is just to simulate props.prices
let prices = []
console.log(prices)

  return(
    <>
    <div className='cartViewContainer'>
      <table>
        <tbody>
        {
          props.cartItems.map(e=> {
            let randomPrice = Math.floor(Math.random() * 9) + 1
            prices.push(randomPrice)
            return (
              <tr>
                <td>X</td>
                <td id='cartItemCell'>{e}</td>
                <td id='itemPriceCell'>${randomPrice}</td>
              </tr>
            )
          })
        }
        <tr>
          <td></td>
          <td>SUBTOTAL</td>
          <td>${prices.reduce((acc, curr) => acc + curr )}</td>
        </tr>
        </tbody>
      </table>
    </div>
    </>
    )
}

export default Cart
