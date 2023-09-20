import { useEffect, useState, useContext } from 'react'
import './Movie-card.css'
import { genresFormater } from '../../utils'
import { Tag } from 'antd'
import { Rate } from 'antd'
import { format, parseISO } from 'date-fns'
import defaultImg from '../../assets/img/default.jpg'
import { minify } from '../../utils/index'
import { ratingColor } from '../../utils/index'

import { GuestContext } from '../../context/index'

import { api } from '../../services'

export const MovieCard = ({ data }) => {
  const [imgMovies, setimgMovies] = useState('')
  const [genres, setGenres] = useState([])
  const [rating, setDefaultRating] = useState(0)

  const guestSessionId = useContext(GuestContext)

  useEffect(() => {
    const fetchDetails = async () => {
      if (guestSessionId) {
        const { data: details } = await api.get(`/movie/${data.id}`, { params: { guest_session_id: guestSessionId } })
        const { data: info } = await api.get(`/movie/${data.id}/account_states`, {
          params: { guest_session_id: guestSessionId },
        })

        setimgMovies(details.poster_path)
        setGenres(details.genres)
        setDefaultRating(info.rated.value)
      }
    }

    fetchDetails()
  }, [guestSessionId])

  const setRating = async (number) => {
    setDefaultRating(number)

    if (number === 0) {
      await api.delete(`/movie/${data.id}/rating`, { params: { guest_session_id: guestSessionId } })
    } else {
      await api.post(`/movie/${data.id}/rating`, { value: number }, { params: { guest_session_id: guestSessionId } })
    }
  }

  return (
    <div className="container">
      <img
        className="poster"
        src={imgMovies ? `https://image.tmdb.org/t/p/w500${imgMovies}` : defaultImg}
        alt="poster"
      />
      <div className="content">
        <div className="header">
          <img
            className="posterMobile"
            src={imgMovies ? `https://image.tmdb.org/t/p/w500${imgMovies}` : defaultImg}
            alt="poster"
          />
          <div className="main">
            <div className="title-rating">
              <div className="title">{data.original_title}</div>
              <div style={{ borderColor: ratingColor(data.vote_average.toFixed(1)) }} className="rating-circle">
                {data.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="date">
              {data.release_date === '' ? 'coming soon' : format(parseISO(data.release_date), 'MMMM d, y')}
            </div>
            <div className="genres">
              {genres.length > 0 ? (
                genresFormater(genres).map((genre) => (
                  <div key={genre.id}>
                    <Tag>{genre.name}</Tag>
                  </div>
                ))
              ) : (
                <div className="genresNull">-</div>
              )}
            </div>
          </div>
        </div>
        <div className="info">{minify(data.overview, 150)}</div>
        <div className="rating">
          <Rate allowHalf value={rating} count={10} style={{ fontSize: 16 }} onChange={setRating} />
        </div>
      </div>
    </div>
  )
}
