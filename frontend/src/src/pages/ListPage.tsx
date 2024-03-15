/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { listData } from "../lib/dummydata.ts";
import "./css/listPage.scss";
import Filter from "../components/Filter.tsx"
import Card from "../components/Card.tsx"
import Map from "../components/Map.tsx";
import { Key } from "react";

function ListPage() {
  const data = listData;

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        {data.map((item: { id: Key | null | undefined; })=>(
          <Card key={item.id} item={item}/>
        ))}
      </div>
    </div>
    <div className="mapContainer py-3 px-4">
      <Map items={data}/>
    </div>
  </div>;
}

export default ListPage;
