import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            // props 접근 방법 : this.props.~
            // map으로 반복문은 유니크한 key가 필요함 => 성능에 중요한 부분임으로 index로 작성하지 말 것!
            <li key={this.props.value.fruit + this.props.index}><b>{this.props.value.fruit}</b> - {this.props.value.taste}</li>
        );
    }
}

export default Try;