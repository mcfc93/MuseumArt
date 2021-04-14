import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as Page from '../util/Page';
import * as Url from '../util/Url';

export default function Tree() {
	const [radio, setRadio] = useState("All");
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const [collapsed, setCollapsed] = useState(false);

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

            <div className="search">
			    <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                <i className="material-icons">search</i>
            </div>

            <NavLink
                to={Page.HOME}
                exact={true}
                className="collection"
                activeClassName=""
                onClick={() => setCollapsed(!collapsed)}
            >
                <span className="heading">
                    <i className="material-icons">{collapsed ? 'chevron_right' : 'expand_more'}</i>
                    {data.name}
                </span>
            </NavLink>
                {!collapsed && data.collection && data.collection.map(wings => {
                    return (
                        <div key={wings.id} className="wings">
                            <span className="heading">
                                <i className="material-icons">chevron_right</i>
                                {wings.name}
                            </span>
                            {
                                wings.collection && wings.collection.filter(item =>
                                        item.name && item.name.toLowerCase().includes(search.toLowerCase())
                                        && (radio === "All" || item.type && item.type.includes(radio)))
                                    .map(items => {
                                    return (
                                        <NavLink
                                            to={Page.ITEM + "/" + items.id}
                                            exact={true}
                                            className="items"
                                            activeClassName="active"
                                            key={items.id}
                                        >
                                            {items.name}
                                        </NavLink>
                                    );
                                })
                            }
                        </div>
                    );
                })}

        </div>
    );
}