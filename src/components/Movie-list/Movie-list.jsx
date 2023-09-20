import { useEffect, useState, useContext } from 'react'
import { MovieCard } from '../Movie-card/Movie-card'

import InputSearch from '../Input-search/Input-search'
import { Pagination } from 'antd'
import { Spin } from 'antd'
import pageNotFound from '../../assets/img/pageNotFound.jpg'
import debounce from 'lodash.debounce'

import { GuestContext } from '../../context/index'

import { getMovies } from '../../services'

import './Movie-list.css'

export const MovieList = ({ tab }) => {
  const [cards, setCards] = useState([])
  const [input, setInput] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loadingState, setLoadingState] = useState('init') // loadin,succese, error, init

  const onSearch = (value) => {
    setInput(value)
    setPage(1)
  }

  const setInputDebounce = debounce(onSearch, 400)

  useEffect(() => {
    setLoadingState('loading')
    try {
      getMovies(input, page).then((data) => {
        setCards(data.results)

        setTotalPages(data.total_results)
        setLoadingState('succese')
      })
    } catch (error) {
      console.log(error)
      setLoadingState('error')
    }

    return () => {
      setCards([])
    }
  }, [input, page, tab])

  const onChange = (page) => {
    setPage(page)
  }

  return (
    <div className="app-container">
      <InputSearch setInput={setInputDebounce} />
      <div className="list">
        {loadingState === 'error' && <img className="pageNotFound" src={pageNotFound} alt="error" />}
        {loadingState === 'loading' && (
          <div className="spin">
            <Spin size="large" />
          </div>
        )}
        {loadingState === 'succese' && cards.length === 0 && (
          <img className="pageNotFound" src={pageNotFound} alt="error" />
        )}
        {loadingState === 'succese' &&
          !!cards.length &&
          cards.map((card) => {
            return <MovieCard key={card.id} data={card} input={input} page={page} />
          })}
      </div>
      {cards.length !== 0 ? (
        <div className="paginationFooter">
          <Pagination
            defaultCurrent={1}
            total={totalPages}
            current={page}
            onChange={onChange}
            defaultPageSize={20}
            showSizeChanger={false}
          />
        </div>
      ) : null}
    </div>
  )
}
