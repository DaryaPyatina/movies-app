import { useEffect, useState, useContext } from 'react'
import { MovieCard } from '../Movie-card/Movie-card'

import { GuestContext } from '../../context/index'

import './Movie-list-rated.css'
import { api } from '../../services'

export const MovieListRated = ({ tab }) => {
  const [cards, setCards] = useState([])

  const guestSessionId = useContext(GuestContext)

  useEffect(() => {
    const fetchMoviesRated = async () => {
      const { data } = await api.get(`/guest_session/${guestSessionId}/rated/movies`)
      console.log(data)

      setCards(data.results)
    }
    fetchMoviesRated()
    return () => {
      setCards([])
    }
  }, [tab])

  return (
    <div className="list-rated">
      {cards.map((card) => {
        return <MovieCard key={card.id} data={card} />
      })}
    </div>
  )
}
