import React, { PureComponent } from 'react';
import './ResponseChkGameCSS.css';

class ResponseChkGame extends PureComponent {
    
    state = {
        state : 'waiting',
        message: '클릭해서 시작하세요.',
        result: []
    };

    timeout;
    startTime;
    endTime;

    interval;

    /*
        class의 경우 라이프사이클
        1. constructor
        2. render
        3. ref
        4. componentDidMount
        5. setState/props 바낄 때마다 -> shouldComponentUpdate -> rerendering -> componentDidUpdate
        6. 부모가 자식을 제거했을 때 -> componentWillUnmount -> 소멸
    */
    componentDidMount() { // render가 실행된 직후 실행됨 -> 이후 rerendering될 때부터는 실행되지 않음
            // 여기에 보통 비동기 요청을 많이 함
                // setInterval
            this.interval = setInterval(()=>{

            }, 1000);

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }

    componentDidUpdate() { // 컴포넌트가 리랜더링 후

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전
        // 비동기 요청 제거
            // clearInterval
        clearInterval(this.interval);

    }

    onClickScreen = (e) => {
        const { state, message, result } = this.state;
        if(state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.'
            });
            
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭'
                });
                this.startTime = new Date();  
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
        } else if(state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
            });
        } else if(state === 'now') { // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime]
                };
            });
        }
    }

    onClickEvent = (variable) => {

    }

    // div 내에 (e) => 이부분을 생략하고 (variable) 다음부분에 (e) => 를 추가해줌(패턴 기억!) : 고차함수
    onClickEvent2 = (variable) => (e) => {

    }

    render() {
        return(
            <>
                <div id="screen" 
                     className={this.state.state}
                     onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                <div onClick={(e) => this.onClickEvent('바위')}>고차함수 전달이벤트 클릭</div>
                <div onClick={this.onClickEvent2('바위')}>고차함수 전달이벤트 클릭</div>
                {/* JSX안에서 if문을 못쓰기 때문에 3항연산자 or && 사용해서 표현해준다. 반복문 for => map으로 표현 */}
                {
                    this.state.result.length === 0 ? null : <div>평균시간 : {this.state.result.reduce((a,b) => a + b) / this.state.result.length}ms</div>
                }
            </>
        );
    }
}

export default ResponseChkGame;