import React, { memo } from 'react';

const Try_Func = memo(({ value : {fruit, taste}, index }) => { // props 로 받아서 props.value, props.index로 접근할 수도 있음( 이건 구조분해로 접근 )
    
    // 자식에서는 props를 절대로 바꾸지 않는다. => 뜻하지 않게 부모에 영향을 줄 수 있음
        // 바까야 하면 state로 할당 후 state를 바까준다.
    const [fruitVal, setFruitVal] = useState(fruit); 
    const onClick = (e) => {
        setFruitVal('1');
    };

    return (
        <div>
            <li key={fruit + index}><b>{fruit}</b> - {taste}</li>
            <div onClick={onClick} >{fruitVal}</div>
        </div>
    );
});

Try_Func.displayName = 'Try_Func';

export default Try_Func;