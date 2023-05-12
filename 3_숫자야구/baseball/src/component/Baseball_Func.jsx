import { useRef, useState, memo } from "react";
import Try_Func from "./Try_Func";


function getNumbers() {
    // ~~~
    return "1";
}

/*
    memo 로 감싸기 : Function 기반에서 memo로 감싸면 부모 컴포넌트가 변경되어도 자식 Component가 변경되는 것을 막아줌
*/
const BaseballFunc = memo(() => {

    /*
        아래처럼 useState에 getNumbers()처럼 넣으면 안됨!
        -> useState는 값과 함수를 받을 수 있는데
        매번 렌더링 될 때마다 BaseballFunc 전체가 재실행된다. 이때 getNumbers도 매번 재실행이 되는대
        다행히 useState는 처음만 getNumbers()의 값을 할당하고 두번째부터는 이를 무시한다.
        하지만 getNumbers가 반복 실행은 됨! 따라서 callback 처럼 getNumbers만 전달하자
        ==> 이를 함수가 값을 반환할 때까지 기다린다 하여 "lazy init" 이라 부른다.
    */ 
    // var [value, setValue] = useState(getNumbers());
    var [value, setValue] = useState(getNumbers);
    var [result, setResult] = useState('');
    var [tries, setTries] = useState([]);

    var inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        // ***이전 State값을 가져올 땐 함수형으로!! 
        // 기존 tries에 add해밨자 화면 업데이트 되지 않음 => why? 주소가 같기 때문에 변화인지를 못함
            // 새로 배열을 할당해서 주소를 바까주어 인지시켜주어야 함!!
        setTries((prevTries) => {
            return [...prevTries, {fruit: '사과' + value, taste: 'delicious'}];
        });
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    
    var fruits = [
        {
            fruit : '사과',
            taste : '맛있다.'
        },
        {
            fruit : '바나나',
            taste : '달다.'
        }
    ];

    return (
        <>
            <div>결과 : {result}</div>
            <form onSubmit={onSubmit}>
                <input maxLength={4} value={value} onChange={onChangeInput} />
                <button>입력!</button>
            </form>
            <ul>
                {
                    tries.map((e, idx) => <Try_Func value = {e} index = {idx} />)
                }
            </ul>
        </>
    );
});

export default BaseballFunc;