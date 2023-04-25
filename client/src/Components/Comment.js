import React from 'react'

function Comment(props) {


    return (
        <div className='comment'>
            <div>{props.lastname}</div>
            <div>{props.name}</div>
            <div>{props.content}</div>
        </div>
    )
}

export default Comment