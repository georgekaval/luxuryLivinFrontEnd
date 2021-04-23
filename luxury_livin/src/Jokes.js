import React, { Component } from 'react'

function Jokes (props) {
  console.log(props)
  const joke = props.joke
  return(
      <div className='modalImg' onClick={props.hide}>
          <div className='jokeContainer'>
            <h3>
              "{joke.value}"
            </h3>
          </div>
      </div>
  )
}
export default Jokes
