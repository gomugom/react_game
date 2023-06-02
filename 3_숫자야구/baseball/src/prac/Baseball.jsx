import { memo, useRef, useState } from "react";

function getNumbers() {
    return "1";
}

// 1. props 
// 2. state
// 3. 부모 컴포넌트가 업데이트 될 때(자식)
// shouldComponentUpdate(nextProps, nextState, nextContext) {
//     if(nextProps.value != this.state.value) return true;
// }

// PureComponent

const Baseball = memo(() => {
    // lazy init
    const [ value, setValue ] = useState(getNumbers);
    const [ tries, setTries ] = useState([]);
    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        
    }

    return(
        <>
            <div>결과 : {value}</div>
            <form onSubmit={onSubmit}>
                <input maxLength={4} onChange={onChange} ref = {inputRef} />
            </form>
        </>
    );
});

export default Baseball;