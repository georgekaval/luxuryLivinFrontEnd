import React, { Component } from 'react'

function Jokes (props) {
  console.log(props)
  const joke = props.joke.data
  return(
    <>
      <h3>
        {joke.value}
      </h3>
  )
}
export default Jokes
