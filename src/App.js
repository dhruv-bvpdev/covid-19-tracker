import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        {/* Title + Select Input Drop field */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={1234} total={2000} />
          <InfoBox title="Recovered" cases={1234} total={2000} />
          <InfoBox title="Deaths" cases={1234} total={2000} />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases By Country</h3>
          {/* Graph */}
          <h3>World Wide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
