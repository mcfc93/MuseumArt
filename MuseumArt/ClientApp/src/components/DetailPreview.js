import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import * as Page from '../util/Page';
import * as Url from '../util/Url';

export default function DetailPreview(props) {
    const { id } = useParams();
    const [data, setData] = useState(props.item ? props.item : {});

    useEffect(() => {
        //if (!props.item) {
            if (localStorage.getItem(id) === null) {
                fetchData();
            } else {
                setData(JSON.parse(localStorage.getItem(id)));
            }
        //}
    }, [id]);

    useEffect(() => {
        if (props.item) {
            setData(props.item);
        }
    }, [props.item]);

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
                const temp = await response.json();
                setData(temp);
                localStorage.setItem(id, JSON.stringify(temp));
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

                    {
                        !props.hideButton &&
                        <NavLink
                            to={Page.EDIT + "/" + data.id}
                            exact={true}
                            activeClassName=""
                        >
                            <button className="primary-button" style={{ float: 'right' }}>Edit</button>
                        </NavLink>
                    }
                </h2>
                <p className="description">{data.description}</p>
            </div>
        </div>
    );
}
