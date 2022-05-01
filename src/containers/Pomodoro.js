import React, {useState, useEffect} from 'react';
import DisplayClock from '../components/DisplayClock';
import Controls from '../components/Controls';
import bootstrap from 'bootstrap';

const Pomodoro = () => {

    const [workTime, setWorkTime] = useState(1500);
    const [breakTime, setBreakTime] = useState(300);
    const [timeLeftInSession, setTimeLeftInSession] = useState()
    const [session, setSession] = useState('Work');
    const [isClockRunning, setIsClockRunning] = useState(false);
    const [intervalID, setIntervalID ] = useState(null)

    useEffect(() => {
        setTime()
    },[session])

    const setTime = () => {
        if(session === 'Work'){
            setTimeLeftInSession(workTime)
        } else if (session === 'Short Break'){
            setTimeLeftInSession(breakTime)
        } else {
            setTimeLeftInSession(breakTime * 2)
        }
    };

    function timer(action) {
        if (action === "start"){
            setIsClockRunning(true);
            let tempID = setInterval(stepDown , 1000);
            setIntervalID(tempID)
        } else if (action === "pause"){
            clearInterval(intervalID);
            setIsClockRunning(false);
        } else {
            setIsClockRunning(false);
            clearInterval(intervalID);
            setTime();
        }
    };

    let time = timeLeftInSession;

    function stepDown() {
        
        if(time > 0 ) {
            time--
            setTimeLeftInSession(time);
        } else {
            setIsClockRunning(false);
            timer('pause');
        }
    };


    const sessionToggle = (event) => {
        setSession(event.target.textContent);
    }

    return(
        <div>
            <div id='session-toggle'>
                <div onClick={sessionToggle}>Work</div>
                <div onClick={sessionToggle}>Short Break</div>
                <div onClick={sessionToggle}>Long Break</div>
            </div>
            <DisplayClock timeLeftInSession={timeLeftInSession} />
            <Controls isClockRunning={isClockRunning} timer={timer}/>
        </div>
    )
};

export default Pomodoro;