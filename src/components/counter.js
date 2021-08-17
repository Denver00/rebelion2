import { faHistory, faPause, faPlay, faChess } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import './counter.css';
import Modal from 'react-modal';
import logo from "../assets/img/rebelion.png";
export default function App() {
    const [timer, setTimer] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    const [guestTeam, setGuestTeam] = useState("");
    const [localTeam, setLocalTeam] = useState("");
    const [textBox, setTextBox] = useState("");
    const [textBox2, setTextBox2] = useState("");
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    function openModal() {
        setIsOpen(true);
      }
    function closeModal() {
        setIsOpen(false);
      }
    function openModal2() {
        setIsOpen2(true);
      }
    function closeModal2() {
        setIsOpen2(false);
      }

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
    const localTeamhandler=(event)=>{
         setLocalTeam(event.target.value); 
        }
        const guestTeamhandler=(event)=>{
            setGuestTeam(event.target.value); 
           }
    const textBoxhandler=(event)=>{
        setTextBox(event.target.value); 
        }
        const textBoxhandler2=(event)=>{
            setTextBox2(event.target.value); 
            }

    return (
        
        <div className="counterContainer">
            <div>
                <div className="title">
                <div className="titleCounter"><h1>{localTeam}</h1></div><img src={logo} width="400"></img><div className="titleCounter2"><h1>{guestTeam}</h1></div>
                </div>
                <div><h1 className="fightsCounter">Valor de la riña: {textBox}</h1><h1 className="fightsCounter">Riña #{textBox2}</h1></div>
                <h1 className="timeDisplay">{format(timer)}</h1>
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
                <button
                data-tip="Agregar equipos"
                className="btn btn-vs" onClick={openModal}>
                <FontAwesomeIcon icon={faChess}></FontAwesomeIcon>
                </button>
                <button
                data-tip="Agregar Peleas"
                className="btn btn-vs2" onClick={openModal2}>
                <FontAwesomeIcon icon={faChess}></FontAwesomeIcon>
                </button>
                </div>
        
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Equipos"
      >  
        <div className="modal-container">
        <p>Agregar Equipos</p>
        <input type="text" value={localTeam} onChange={localTeamhandler}></input>
        <input type="text" value={guestTeam} onChange={guestTeamhandler}></input>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Equipos">  
        <div className="modal-container">
        <p>Valor de la riña y numero</p>
        <input type="text" value={textBox} onChange={textBoxhandler} /*onKeyPress={addfile}]*/></input>
        <input type="text" value={textBox2} onChange={textBoxhandler2} /*onKeyPress={addfile}]*/></input>
        </div>
      </Modal> 
      
            <ReactTooltip />
        </div>
    );
}