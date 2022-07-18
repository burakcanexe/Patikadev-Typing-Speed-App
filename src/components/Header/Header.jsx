import React, { useEffect, useMemo, useState } from 'react'
import './Header.styles.css'
import { BiTimer } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { timerR, setTyping } from '../../redux/wordSlice'

function Header({ time, setTime }) {
    const timeRedux = useSelector(state => state.words.second)
    const isTyping = useSelector(state => state.words.isTyping)
    const dispatch = useDispatch()

    const timer = () => {
    }

    return (
        <header>
            <h1>Typing Speed App</h1>
            <div className="secondBox" onClick={timer}>
                <BiTimer className='secondIcon' />
                <p className='secondText'>{timeRedux}</p>
            </div>
        </header>
    )
}

export default React.memo(Header)