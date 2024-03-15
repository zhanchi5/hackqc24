/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import './css/list.scss'
import Card from "./Card.tsx"
import {listData} from "../lib/dummydata.ts"
import { Key } from 'react';

const List = () =>
{
    return (
        <div className="list">
            {listData.map((item: { id: Key | null | undefined; }) => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    );
};
export default List;