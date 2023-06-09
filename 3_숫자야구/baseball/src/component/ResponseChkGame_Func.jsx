import React, { useState, useRef, memo, useEffect } from 'react';
import './ResponseChkGameCSS.css';

const ResponseChkGame = memo(() => { // 부모가 바꼇을 때 자식이 변경되지 않도록! memo 사용
    
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    /*
        useRef
        => 1. DOM focus 제어할 때
           2. 값은 변하지만 setState처럼 return(화면 랜더링)이 일어나진 않고자할 때 사용!
        ==> 값 접근시 current를 꼭 붙여주어야한다!

        **** 함수형의 경우 class와 다르게 리랜더링이 일어날 때 함수전체가 실행됨!
        => 따라서, let, var과 같은 변수로 선언시 랜더링 될 때마다 앞부분에 선언된 값으로 초기화될 수 있기 때문에
        ==> 값은 변하지만 rendering은 원치 않을 때 useRef사용!
    */ 
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();
    // timeout;
    // startTime;
    // endTime;

    // 매번 함수의 재실행을 막기위해 사용됨.
    // componentDidMount, componentDidUpdate 역할을 대신해줌(1:1 매핑까진 아님)
    useEffect(() => {
        // setInterval
        return () => { // componentWillUnmount 역할
            // clearInterval
        }
    }, []); // 바끼는 state를 []안에 넣어줌 ==> []안에 넣어준 녀석이 바낄 때마다 useEffect 내의 익명함수가 계속 실행됨
    // []을 빈채로 두면 : 최초 한번만 실행하고 더이상 실행하지 않겠다는 의미.

    const onClickScreen = (e) => {

        if(state === 'waiting') {

            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                
                this.startTime = new Date();  
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
        } else if(state === 'ready') { // 성급하게 클릭

            clearTimeout(timeout.current);
            
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        
        } else if(state === 'now') { // 반응속도 체크
            
            this.endTime = new Date();
            
            setState('waiting');

            setMessage('클릭해서 시작하세요.');

            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];]
            });

        }
    }

   
    return(
        <>
            <div id="screen" 
                    className={state}
                    onClick={onClickScreen}
            >
                {message}
            </div>
            {/* JSX안에서 if문을 못쓰기 때문에 3항연산자 or && 사용해서 표현해준다. 반복문 for => map으로 표현 */}
            {
                result.length === 0 ? null : <div>평균시간 : {result.reduce((a,b) => a + b) / result.length}ms</div>
            }
        </>
    );
    
});

export default ResponseChkGame;