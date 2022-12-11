import React, {useEffect, useState} from "react";

export default function Timer() {
    const [time, setTime] = useState(10);

    const TimerStart = () => {

        let innerTime = time;
        const timerId = setInterval(
            () => {
                if (innerTime > 0) {
                    innerTime--;
                    setTime(innerTime);
                } else {
                    clearInterval(timerId);
                }
            },
            1000
        );
    }


    return <>
        <button onClick={TimerStart}>start!</button>
        <h1>{time}</h1></>;
}


export default function TimerWithUseEffect() {
    const [time, setTime] = useState(0);
    useEffect(() => {
        const timerId = setInterval(
            () => setTime(time => time + 1),
            1000
        );
        return () => clearInterval(timerId);
    }, []);
    return <span>{time}</span>;
}

