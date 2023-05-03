function Try_Func({ value, index }) { // props 로 받아서 props.value, props.index로 접근할 수도 있음( 이건 구조분해로 접근 )
    return (
        <li key={value.fruit + index}><b>value.fruit</b> - {value.taste}</li>
    );
}

export default Try_Func;