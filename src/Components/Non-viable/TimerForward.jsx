import React, {useEffect, useState} from "react";

/**
 * @return {boolean}
 */
function IsPrimeNumber(number) {
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            console.log(number);
            console.log(i);
            console.log(number % i === 0);

            return false;
        }
    }

    return true;
}

/**
 * @return {number}
 */
function* NextPrimeNumber(currentNumber) {
    let numberToReturn = -1;

    if (currentNumber < 3) {
        numberToReturn = 3;
    }
    else {
        numberToReturn = currentNumber + 2;
        while (!IsPrimeNumber(numberToReturn))
        {
            numberToReturn += 2;
        }
    }

    console.log("numberToReturn");
    console.log(numberToReturn);

    return numberToReturn;
}

export default function TimerForward() {
    const [primeNumber, setPrimeNumber] = useState(2);
    const [primeNumbersString, setPrimeNumbersString] = useState("2");

    useEffect(() => {
        const timerId = setInterval(
            () => {
                console.log("primeNumber");
                console.log(primeNumber);
                console.log("primeNumbersString");
                console.log(primeNumbersString);

                setPrimeNumber(NextPrimeNumber(primeNumber));
                setPrimeNumbersString(primeNumbersString + ", " + String(primeNumber));

                console.log("primeNumber");
                console.log(primeNumber);
                console.log("primeNumbersString");
                console.log(primeNumbersString);
            },
            1000
        );
        return () => clearInterval(timerId);
    }, []);
    return <div>{primeNumbersString}</div>;
}