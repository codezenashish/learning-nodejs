import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [jokes, setJokes] = useState([])
  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching jokes:', error)
      })
  }, [])
  return (
    <>
      <h1>Ashish Choudhary</h1>
      <p>Jokes: {jokes.length}</p>

      {
        jokes.map((joke) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>

        ))
      }
    </>
  )
}

export default App