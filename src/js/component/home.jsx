import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faRepeat, faClockRotateLeft, faClock } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [countdown, setCountdown] = useState(false);
    const [inputSeconds, setInputSeconds] = useState('');

    // transforma total de segundos en horas minutos y segundos

    const setTimeFromSeconds = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        setHours(h);
        setMinutes(m);
        setSeconds(s);
    }

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    // countdown logic
                    if (countdown) {
                        if (prevSeconds > 0) {
                            return prevSeconds - 1;
                        } else if (minutes > 0) {
                            setMinutes((prevMinutes) => prevMinutes - 1);
                            return 59;
                        } else if (hours > 0) {
                            setHours((prevHours) => prevHours - 1);
                            setMinutes(59);
                            return 59;
                        } else {
                            clearInterval(interval); //parar el countdown a 0;
                            alert('Se acabó la cuenta atras!!!');
                            return 0;
                        }
                    } else {
                        //counting up logic
                        if (prevSeconds < 59) {
                            return prevSeconds + 1;
                        } else {
                            setMinutes((prevMinutes) => {
                                if (prevMinutes < 59) {
                                    return minutes + 1
                                } else {
                                    setHours((prevHours) => prevHours + 1);
                                    return 0;
                                }
                            });
                            return 0;
                        }
                    }
                });
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [isRunning, countdown, hours, minutes]);

    const toggleRunning = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    }

    // resetear

    const reset = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
        setCountdown(false);
    };

    const input = (e) => {
        setInputSeconds(e.target.value);
    }

    const startCountdown = () => {
        const totalSeconds = parseInt(inputSeconds, 10);
        if (isNaN(totalSeconds) || totalSeconds <= 0) {
            reset();
            return;
        }
        setTimeFromSeconds(totalSeconds);
        setCountdown(true);
        setIsRunning(true);
        setInputSeconds('');
    }

    return (
        <>
            <div className="counter">
                <div className="clock">
                    <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="hours">{hours < 10 ? `0${hours}` : hours}</div>
                <div className="minutes">{minutes < 10 ? `0${minutes}` : minutes}</div>
                <div className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
            <div className="d-flex justify-content-center m-4">
                <input type="number" value={inputSeconds} onChange={input} placeholder="Introducir segundos" />
                <button className="regresiveBtn" onClick={startCountdown}>Cuenta Atrás   <FontAwesomeIcon icon={faClockRotateLeft} /> </button>
            </div>
            {/* botones */}
            <div className="d-flex justify-content-center">
                <button className={isRunning ? 'btn btn-light border-primary' : 'btn btn-light border-success'} onClick={toggleRunning}>{isRunning ? <FontAwesomeIcon icon={faPause} style={{color: "#0d6efd"}}  /> : <FontAwesomeIcon icon={faPlay} style={{color: "#198754"}}  />}</button>
                <button className="btn btn-danger mx-2" onClick={reset}><FontAwesomeIcon icon={faRepeat} style={{color: "#fff"}}  /></button>
            </div>

        </>
    )
}
export default Home;