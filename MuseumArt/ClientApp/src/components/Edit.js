import React, { useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import DetailPreview from './DetailPreview';
import * as Page from '../util/Page';

export default function Edit() {
    const { id } = useParams();
    const temp = JSON.parse(localStorage.getItem(id));
    const [item, setItem] = useState(temp);
    const [name, setName] = useState(temp? temp.name : "");
    const [url, setUrl] = useState(temp ? temp.url : "");
    const [description, setDescription] = useState(temp ? temp.description : "");
    const [nameValid, setNameValid] = useState(true);
    const [urlValid, setUrlValid] = useState(true);

    return (
        <div className="edit">
            <div className="left-column">
                <label>
                    Title
                    <input type="text" value={name} onChange={e => { setNameValid(e.target.value.trim() !== ''); setName(e.target.value); }} className={nameValid ? '' : 'invalid'} />
                    <span className="error-message">{nameValid? '' : 'Required field!'}</span>
                </label>
                <label>
                    Image URL
                    <input type="text" value={url} onChange={e => { setUrlValid(e.target.value.trim() !== ''); setUrl(e.target.value); }} className={urlValid ? '' : 'invalid'} />
                    <span className="error-message">{urlValid? '' : 'Required field!'}</span>
                </label>
                <label className="label-description">
                    Description
                    <textarea
                        className=""
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        spellCheck="false"
                    ></textarea>
                </label>
                <div className="buttons">
                    <NavLink
                        to={(nameValid && urlValid) ? Page.ITEM + "/" + id : '#'}
                        exact={true}
                        activeClassName=""
                    >
                        <button type="submit" className="primary-button" disabled={!nameValid || !urlValid} onClick={() => {
                            localStorage.setItem(id, JSON.stringify({ ...item, name, url, description }));

                            if (localStorage.getItem("tree")) {
                                const data = JSON.parse(localStorage.getItem("tree"));
                                data && data.collection.map(wings => {
                                    wings.collection.map(item => {
                                        if (item.id === id) {
                                            item.name = name;
                                        }
                                    });
                                });

                                localStorage.setItem("tree", JSON.stringify(data));
                            }
                        }}>
                            Save
                        </button>
                    </NavLink>
                    <button className="secondary-button" onClick={() => setItem({ ...item, name, url, description })}>Preview</button>
                </div>
            </div>
            <div className="right-column">
                <DetailPreview hideButton={true} item={item} />
            </div>
        </div>
    );
}
