import React, { Component } from 'react';
import Try from './Try';

/*
    [ Node Module System ]
    module.exports = Baseball;
    const baseball = require('./Baseball'); // require를 씀

    [ React ES2015 ]
    export default Baseball;
    export const hello = 'hello'; 

    --> default는 파일 하나당 한번만 가능, 아래는 여러번 가능
    -> default로 내보낼 경우 : import Baseball from './Baseball'; // Baseball 그대로 와야함
    -> default가 아닌 경우   : import { hello } from './Baseball'; // {}로 감싸주어야 함

    ** Node Module System과 React import문은 서로 90프로 이상 호환 가능
*/

class Baseball extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        value : '',
        result : '',
        tries : []
    }

    inputRef;

    onSubmit = (e) => { // 화살표함수로 사용해야 this.state 접근 가능
        e.preventDefault();
        this.inputRef.focus();
    }

    onChangeInput = (e) => {
        this.setState({
            value : e.target.value
        });
    }

    setInputRef = (c) => {
        this.inputRef = c;
    }

    fruits = [
        {
            fruit : '사과',
            taste : '맛있다.'
        },
        {
            fruit : '바나나',
            taste : '달다.'
        }
    ];

    render() {
        return (
            <>
                <div>결과 : {this.state.result}</div>
                <form onSubmit={this.onSubmit}>
                    <input maxLength={4} ref={this.setInputRef} value = {this.state.value} onChange={this.onChangeInput} /> 
                </form>
                <ul>
                    {
                        // map을 이용한 반복문 element 제어
                        this.fruits.map((e, idx) => {
                            <Try value = {e} index = {idx} />
                        })
                    }
                </ul>
            </>
        );
    }

}

export default Baseball;