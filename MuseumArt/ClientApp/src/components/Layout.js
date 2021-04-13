import React, {  } from 'react';
import Tree from './Tree';

export default function Layout(props) {
    return (
        <>
            <div className="container">
                <Tree />
                <div className="content">
                    {props.children}
                </div>
            </div>
        </>
    )
}
