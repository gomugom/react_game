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

    render() {
        return(
            <>
                <div id="screen" 
                     className={this.state.state}
                     onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                {/* JSX안에서 if문을 못쓰기 때문에 3항연산자 or && 사용해서 표현해준다. 반복문 for => map으로 표현 */}
                {
                    this.state.result.length === 0 ? null : <div>평균시간 : {this.state.result.reduce((a,b) => a + b) / this.state.result.length}ms</div>
                }
            </>
        );
    }
}

export default ResponseChkGame;