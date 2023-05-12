import React, { PureComponent } from 'react';
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

class Baseball extends PureComponent { // PureComponent를 사용하면 shouldComponentUpdate를 대체할 수 있음 => 자동 shouldComponentUpdate + 부모 component변경시 자식 component변경 막아줌

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

    testArrays = [
        {
            name : 'h1',
            age : 20
        },
        {
            name : 'h2',
            age : 25
        },
        {
            name : 'h3',
            age : 28
        }
    ];

    inputRef;

    /**
     * [ React Render에 관하여 ... ]
     * 
     *  React가 렌더링 되는 경우는?
     *  1. Props가 변경될 때
     *  2. state가 변경될 때
     *  4. 부모 컴포넌트가 변경될 때
     *  => 하지만 React는 덜 영리해서 setState만 호출해도 그중 reRendering이 되지 않아도 되는 경우에도 렌더링이 발생할 수 있다
     *  => 따라서, 어떤 조건일 때 렌더링이 될지를 지정해 줄 수 있는데 이때 "shouldComponentUpdate 메서드를 이용한다."
     * 
     * => PureComponent 사용시 이 부분은 대체할 수 있음 하지만 특정 state값이 변경되어도 rerendering 되지 않게 등의 세밀작업은 shouldComponentUpdate를 통해서 해야함
    */
    // shouldComponentUpdate(nextsProps, nextsState, nextsContext) {
    //     if(this.state.value !== nextsState.value) {
    //         return true;
    //     }
    //     if(this.state.result !== nextsState.result) return true;
    // };

    onSubmit = (e) => { // 화살표함수로 사용해야 this.state 접근 가능
        e.preventDefault();
        
        // ** array.push로 넣으면 X => 배열변화를 감지하지 못해서 UI 업데이트가 발생하지 않음 => ...활용!!
        // **** 한 메서드 내에서 setState가 여러번 발생할 경우 비동기로 처리될 수 있기 때문에
            // 이전 state값을 참조하기 위해 this.state.~ 로 접근하지 말고 prevState(함수형 state)를 통해 접근하자!!
        this.setState((prevState) => {
            return {
                tries: [...prevState.state.tries, {fruit: '사과' + this.state.value, taste:'delicious'}]
            };
        });
        
        this.inputRef.focus();

        // var test1 = this.testArrays.splice(1, 1); // idx = 1에서부터 1개 지움
        // console.log(this.testArrays); // 잘려진 것 빠진 전체 배열(원본 데이터 영향 o)
        // console.log(test1); // 잘려나온 배열

        var test2 = this.testArrays.splice(this.testArrays.length, 0, {name : 'h4', age: 33}, {name : 'h5', age: 36});
        console.log(this.testArrays);
        console.log(test2);

    }

    onChangeInput = (e) => {
        this.setState({
            value : e.target.value
        });
    }

    setInputRef = (c) => {
        this.inputRef = c;
    }

    
    render() {

        // 비구조화 할당으로 대입
        var { tries } = this.state;

        return (
            <>
                <div>결과 : {this.state.result}</div>
                <form onSubmit={this.onSubmit}>
                    <input maxLength={4} ref={this.setInputRef} value = {this.state.value} onChange={this.onChangeInput} /> 
                    <button>입력!</button>
                </form>
                <ul>
                    {
                        // map을 이용한 반복문 element 제어
                        tries.map((e, idx) => {
                            return (
                                <Try value = {e} index = {idx} />
                            );
                        })
                    }
                </ul>
            </>
        );
    }

}

export default Baseball;