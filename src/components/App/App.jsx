import { Tabs, Result } from "antd";

import { MovieList } from "../Movie-list/Movie-list";

import { MovieListRated } from "../Movie-list-rated/Movie-list-rated";

import { Offline, Online } from "react-detect-offline";

import "./App.css";
import { useState } from "react";

export const App = () => {
  const [tab, setTab] = useState("1");

  const tabs = [
    {
      key: "1",
      label: "Search",
      children: <MovieList tab={tab} />,
    },
    {
      key: "2",
      label: "Rated",
      children: <MovieListRated tab={tab} />,
    },
  ];

  return (
    <>
      <Online>
        <Tabs
          activeKey={tab}
          onChange={(e) => {
            setTab(e);
          }}
          items={tabs}
          tabBarStyle={{ marginRight: "auto", marginLeft: "auto" }}
        />
      </Online>
      <Offline>
        <Result
          status="500"
          title="Отсутвует подключение к интернету"
          subTitle="Найдите ближайшую точку Wi-Fi"
        />
      </Offline>
    </>
  );
};
