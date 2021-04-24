import './App.css'



const Cart = (props) => {


// this is just to simulate props.prices
let prices = [0]


  return(
    <>
    <div className='modal-cart'>
    <div className='cartViewContainer'>
      <table>
        <tbody>
        {
          props.cartItems.map(e=> {

            prices.push(e.price)
            return (
              <tr>
                <td id='XremoveBtn' onClick={()=> props.removeItem(e)}>X</td>
                <td id='cartItemCell'>{e.item}</td>
                <td id='itemPriceCell'>${e.price}</td>
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
    <button id='closeBtn' type="button" onClick={props.hide}>
      X
    </button>
    </div>
    </>
    )
}

export default Cart
