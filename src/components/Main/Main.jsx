import React, { useEffect, useState } from 'react'
import './Main.styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { setTyping, timerR, setTrue, setWrong } from '../../redux/wordSlice'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

function Main() {
  const [input, setInput] = useState('')
  const [showWords, setShowWords] = useState([])
  const [getWords, setGetWords] = useState(0)

  const [trueWord, setTrueWord] = useState(0)
  const [wrongWord, setWrongWord] = useState(0)

  const [isFinish, setIsFinish] = useState(false)

  const words = useSelector(state => state.words.items)
  const isTyping = useSelector(state => state.words.isTyping)
  const trueWordRe = useSelector(state => state.words.trueWord)
  const wrongWordRe = useSelector(state => state.words.wrongWord)

  const dispatch = useDispatch()


  useEffect(() => {
    if (getWords % 10 == 0) {
      setShowWords(words.slice(getWords, getWords + 10))
    }
  }, [getWords, words])

  useEffect(() => {
    if (isFinish) {
      dispatch(setTrue(trueWord))
      dispatch(setWrong(wrongWord))
      setShowWords(words.slice(0, 10))
      setTrueWord(0)
      setWrongWord(0)
      setGetWords(0)
    }
  }, [isFinish])

  const typing = (e) => {
    let i = 10
    dispatch(setTyping(true))
    const interval = setInterval(() => {
      if (!isTyping) {
        i = i - 1
        dispatch(timerR(i))
        if (i === 0) {
          clearInterval(interval)
          dispatch(timerR(10))
          dispatch(setTyping(false))
          setIsFinish(true)
        }
      }
    }, 1000)

    const value = e.target.value
    const lastChar = e.target.value[e.target.value.length - 1]

    setInput(e.target.value)
    if (lastChar === ' ') {
      if (words[getWords] == value) {
        setTrueWord(trueWord + 1)
      } else {
        setWrongWord(wrongWord + 1)
      }

      setGetWords(getWords + 1)
      setInput('')
    }
  }

  return (
    <div className='main'>
      <div className="wordsBox">
        {showWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </div>
      {isFinish ? (
        <div className='finishBox'>
          <div className="status">
            <div className="trueBox">
              <AiFillCheckCircle className='statusIcon trueIcon' />
              <p>{trueWordRe}</p>
              <p>words</p>
            </div>
            <div className="perBox">
              <p>Per</p>
              <p>60</p>
              <p>Second</p>
            </div>
            <div className="wrongBox">
              <AiFillCloseCircle className='statusIcon wrongIcon' />
              <p>{wrongWordRe}</p>
              <p>words</p>
            </div>
          </div>
          <button onClick={() => setIsFinish(false)}>Try Again</button>
        </div>
      ) : (

        <div className="inputBox">
          <input type="text" placeholder='Başlamak için bir şeyler yaz...' value={input} onChange={typing} />
        </div>
      )
      }
    </div >
  )
}

export default Main