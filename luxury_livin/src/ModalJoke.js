

import './App.css'


function ModalJoke(props) {
  const toggleClass = props.show ? 'display-block' : 'display-none'
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

export default ModalJoke
