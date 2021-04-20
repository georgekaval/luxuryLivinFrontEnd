import React, { Component } from 'react'

function Jokes (props) {
  console.log(props)
  const jokesReturned = props.joke.value
  return(
    <>
      <h2> Chuck Norris Fact! </h2>
        <h3> {jokesReturned} </h3>
    </>
  )
}
export default Jokes
