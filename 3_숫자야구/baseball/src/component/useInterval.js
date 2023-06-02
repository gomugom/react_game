import { useEffect, useRef } from "react";

// [ Custom Hook 만들기 ]

// useInterval(() => {
//     console.log();
// }, 1000); // 이처럼 사용가능 : custom hook 

function useInterval(callback, delay) {
    const savedCallback = useRef(); // 변화하지만 rerender하고싶지 않은 변수는 useRef로 감싸줌

    useEffect(() => { // 최초한번 callback 할당받고 더이상 실행안됨
        savedCallback.current = callback;
    });

    useEffect(()=>{
        function tick() {
            savedCallback.current();
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    return savedCallback.current;
}

function getNumbers() {

    var candidates = new Array(45);
    candidates = candidates.map((v, i) => i+1); // 1 ~ 45 까지 순서대로 넣음

    var shuffles = [];

    while(candidates.length > 0) {
        shuffles.push(candidates.splice(Math.floor(Math.random() * candidates.length), 1));
    }

}

export default useInterval;