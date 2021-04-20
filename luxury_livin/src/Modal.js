

import './App.css'


function Modal(props) {
  const toggleClass = props.show ? 'modal display-block' : 'modal display-none'
  return (

    <div className={toggleClass}>

     <section className="modal-main">
          {props.children}
       <button id='closeBtn' type="button" onClick={props.hide}>
         X
       </button>

     </section>

   </div>

  )

}

export default Modal
