

import './App.css'


function ModalJoke(props) {
  const toggleClass = props.show ? 'display-block' : 'display-none'
  return (

    <div className={toggleClass}>
      <div className='modal'>
         <section className="modal-jokes">
              {props.children}
          </section>
      </div>
   </div>

  )

}

export default ModalJoke
