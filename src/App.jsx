import React, { useEffect, useState } from "react";
import Station from "./Station";

const App = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [channelTypeFilter, setChannelTypeFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.sr.se/api/v2/channels?format=json&size=100"
        );
        const data = await response.json();
        setChannels(data.channels);
        setFilteredChannels(data.channels);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setChannelTypeFilter(event.target.value);
    filterChannels(event.target.value);
  };

  const filterChannels = (type) => {
    if (type === "all") {
      setFilteredChannels(channels);
    } else {
      const filtered = channels.filter(
        (channel) => channel.channeltype === type
      );
      setFilteredChannels(filtered);
    }
  };

  return (
    <>
      <h1>Sveriges Radio Player in React</h1>
      <p>
        Uppgift - Sveriges Radio Player in React{" "}
        <a
          href="https://github.com/davidshore/chas_radio-player-react"
          target="_blank"
        >
          Github repo{" "}
        </a>
      </p>
      <p>
        Created by Ozay Ozdemir{" "}
        <a
          href="https://github.com/ozayo/chas_radio-player-react.git"
          target="_blank"
        >
          Github repo
        </a>
      </p>
      <div className="radiolist">
        <div className="filter">
          <label htmlFor="channelFilter">Filter by Channel Type:</label>
          <select
            id="channelFilter"
            onChange={handleFilterChange}
            value={channelTypeFilter}
          >
            <option value="all">All Channels</option>
            <option value="Rikskanal">Rikskanal</option>
            <option value="Lokal kanal">Lokal kanal</option>
            <option value="Minoritet och språk">Minoritet och språk</option>
            <option value="Fler kanaler">Fler kanaler</option>
            <option value="Extrakanaler">Extrakanaler</option>
          </select>
        </div>

        <div className="channels">
          {filteredChannels.map((channel) => (
            <Station key={channel.id} {...channel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
