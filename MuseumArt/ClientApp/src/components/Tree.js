import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as Page from '../util/Page';
import * as Url from '../util/Url';

export default function Tree() {
	const [radio, setRadio] = useState("All");
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("tree") === null) {
            fetchData();
        } else {
            setData(JSON.parse(localStorage.getItem("tree")));
        }
	}, []);

    async function fetchData() {
        //setLoading(true);
        try {
            const response = await fetch(Url.BASE + Url.COLLECTION, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
            if (response.status === 200) {
                const temp = await response.json();
                setData(temp);
                localStorage.setItem("tree", JSON.stringify(temp));
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
        <div className="tree">
			<div className="radio-container">
				
				<label>
					<input type="radio" name="type" value="All" checked={radio === "All"} onChange={() => setRadio("All")} />
					All
				</label>
				<label>
					<input type="radio" name="type" value="painting" checked={radio === "painting"} onChange={() => setRadio("painting")} />
					Painting
				</label>
				<label>
                    <input type="radio" name="type" value="potery" checked={radio === "potery"} onChange={() => setRadio("potery")} />
					Potteries
				</label>
			</div>

			<input type="search" value={search} onChange={e => setSearch(e.target.value)} />
            <br />

            <NavLink
                to={Page.HOME}
                exact={true}
                className="navigation-item"
                activeClassName=""
            >
                <div className="navigation-icon">
                    {/*<i className="material-icons">...</i>*/}
                </div>
                <div className="navigation-heading">
                    {data.name}
                </div>
            </NavLink>
            <ul>
                {data.collection && data.collection.map(wings => {
                    return (
                        <li key={wings.id}>{wings.name}
                            {
                                wings.collection && wings.collection.filter(item =>
                                        item.name && item.name.toLowerCase().includes(search.toLowerCase())
                                        && (radio === "All" || item.type && item.type.includes(radio)))
                                    .map(items => {
                                    return (
                                        <NavLink
                                            to={Page.ITEM + "/" + items.id}
                                            exact={true}
                                            className="navigation-item"
                                            activeClassName="active"
                                            key={items.id}
                                        >
                                            <div className="navigation-icon">
                                                {/*<i className="material-icons">...</i>*/}
                                            </div>
                                            <div className="navigation-heading">
                                                {items.name}
                                            </div>
                                        </NavLink>
                                    );
                                })
                            }
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}