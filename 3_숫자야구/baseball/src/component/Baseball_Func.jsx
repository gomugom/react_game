import { useRef, useState } from "react";
import Try_Func from "./Try_Func";


function BaseballFunc() {

    var [value, setValue] = useState('');
    var [result, setResult] = useState('');
    var [tries, setTries] = useState([]);

    var inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
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
            </form>
            <ul>
                {
                    fruits.map((e, idx) => <Try_Func value = {e} index = {idx} />)
                }
            </ul>
        </>
    );
}

export default BaseballFunc;