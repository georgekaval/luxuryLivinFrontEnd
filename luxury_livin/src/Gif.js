
import './App.css'


const Gif = (props) => {

  return(
    <>
    <div className='modal'>
        <div className='modal-gif'>
          <div className='.gifContainer'>
              <button id='closeBtn' type="button" onClick={props.hide}>X</button>
              <img id='gifImg' src={props.gif}/>
          </div>
        </div>
    </div>
    </>
  )
}

export default Gif
