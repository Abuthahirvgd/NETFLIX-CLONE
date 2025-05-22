import React, { useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
import cards_data from '../../assets/cards/Cards_data'





const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2M1NWJiNDZjZDgyOTQ1MjEyNDUyNThlNGYzNmY3MyIsIm5iZiI6MTczMzIwMjk1Mi4yNjcsInN1YiI6IjY3NGU5NDA4OTAyOWExZmNjMzZhYTQyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IGseTN449ymFCL-EGwqIpwE5CQnu-amV7bxkRAA7g28'
    }
  };
  
  const cardsRef = useRef();

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    const endpoint = category ? `/movie/${category}` : '/movie/now_playing';
    fetch(`https://api.themoviedb.org/3${endpoint}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[category])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"} </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
