

import './App.css'


const CartModal = (props) => {
  const toggleClass = props.show ? 'display-block' : 'display-none'
  return (

    <div className={toggleClass}>

     <section>
          {props.children}
    </section>

   </div>

  )

}

export default CartModal
