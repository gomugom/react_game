import React, { memo } from 'react';

const Try_Func = memo(({ value : {fruit, taste}, index }) => { // props 로 받아서 props.value, props.index로 접근할 수도 있음( 이건 구조분해로 접근 )
    return (
        <li key={fruit + index}><b>{fruit}</b> - {taste}</li>
    );
});

Try_Func.displayName = 'Try_Func';

export default Try_Func;