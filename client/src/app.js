import React, { useState, useEffect } from 'react'

export default function app() {

  const [data, setData] = useState([{}])

  useEffect( () => {
    fetch("/api").then(
      response => response.json()
    ).then (
      data => {
        setData(data)
      }
    )
  })

  return (
    <div>
    </div>
  );
}
