import React from 'react';

export default function ErrorPage(props) {
    return (
        <div className="error-page">
            <span>{props.code}</span>
            <span>{props.description}</span>
        </div>
    )
}