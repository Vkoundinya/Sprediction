import React from "react"

const Card = (props) => {
  return (
    <>
    <tr>
      <td>
          <h3>{props.title}<span><img src={props.image} alt="/" width={15} height={15}/></span></h3>  
      </td>
      <td><h4>{props.code}</h4></td>
      </tr>
    </>
  )
}

export default Card