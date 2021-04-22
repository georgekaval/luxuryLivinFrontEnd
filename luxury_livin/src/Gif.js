
import './App.css'


const Gif = (props) => {

  return(
    <>
    <div className='modal-gif'>

      <img src={props.gif}/>
      <button id='closeBtn' type="button" onClick={props.hide}>
        X
      </button>
    </div>
    </>
  )
}

export default Gif
