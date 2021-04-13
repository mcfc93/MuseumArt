﻿import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import * as Url from '../util/Url';

export default function DetailPreview() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        //setLoading(true);
        try {
            const response = await fetch(Url.BASE + Url.ITEM + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
            if (response.status === 200) {
                setData(await response.json());
            } else {
                //
            }
        } catch (err) {
            console.error(err);
            //setError(true);
        } finally {
            //setLoading(false);
        }
    }

    return (
        <div className="detail-preview">
            <img className="image" src={data.url} alt={data.name} />
            <div className="details">
                <h2 className="name">
                    {data.name}
                    <button style={{ float: 'right' }}>Edit</button>
                </h2>
                <p className="description">{data.description}</p>
            </div>
        </div>
    );
}