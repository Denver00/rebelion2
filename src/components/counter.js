import { faHistory, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import './counter.css';

export default function App() {
    const [timer, setTimer] = useState(0);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        let counter;
        if (toggle) {
            counter = setInterval(() => setTimer(timer => timer + 1), 1000);
        }
        return () => {
            clearInterval(counter);
        };
    }, [toggle]);

    const handleStart = () => {
        setToggle(true);
    };

    const handleStop = () => {
        setToggle(false);
    };

    const handleReset = () => {
        setTimer(0);
        setToggle(false);
    };

    const format = (s) => {
        let sec_num = parseInt(s, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    return (
        <div className="counterContainer">
            <div>
                <h1 class="titleCounter">Cronometro</h1>
                <h1 class="timeDisplay">{format(timer)}</h1>
                <br />
                <button
                    data-tip={!toggle ? 'Iniciar' : 'Pausar'}
                    className="btn btn-play" onClick={!toggle ? handleStart : handleStop}>
                    {!toggle ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
                </button>
                <button
                    data-tip="Reiniciar"
                    className="btn" onClick={handleReset}>
                    <FontAwesomeIcon icon={faHistory} />
                </button>
            </div>
            <ReactTooltip />
        </div>
    );
}