import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
// done
export default function Details() {
  const [details, setDetails] = useState();
  const [yesterdayDetails, setYesterdayDetails] = useState();
  const [tomorrowsDtails, setTomorrowDetails] = useState();

  const [searchDetails, setSearchDetails] = useState();
  const [searchYesterdayDetails, setSearchYesterdayDetails] = useState();
  const [searchTomorrowsDtails, setSearchTomorrowDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().slice(0, 10);

  // Calculate the previous day in YYYY-MM-DD format
  const previousDate = new Date(Date.now() - 864e5).toISOString().slice(0, 10);

  // Calculate the next day in YYYY-MM-DD format
  const nextDate = new Date(Date.now() + 864e5).toISOString().slice(0, 10);

  const updateRecentSearches = (city) => {
    const updatedRecentSearches = [city, ...recentSearches.slice(0, 4)];
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
  };

  useEffect(() => {
    const storedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  const handleSearchSubmit = async () => {
    
    const present_url = `https://api.weatherapi.com/v1/forecast.json?key=70ee421f9801416b9b0145330240902&q=${location}`;
    const response = await fetch(present_url);
    const data = await response.json();
    console.log(data);

    if (data.hasOwnProperty("error")) {
      setSearchDetails(null);
      setSearchYesterdayDetails(null);
      setSearchTomorrowDetails(null);
      alert("City not available");
    } else {
      setSearchDetails(data);

      // -------------------------
      updateRecentSearches(location);
      // -----------------------------

      const past_url = `https://api.weatherapi.com/v1/history.json?key=70ee421f9801416b9b0145330240902&q=${location}&date=${previousDate}`;
      const past_response = await fetch(past_url);
      const past_data = await past_response.json();
      console.log(past_data);
      setSearchYesterdayDetails(past_data);

      const future_url = `https://api.weatherapi.com/v1/history.json?key=70ee421f9801416b9b0145330240902&q=${location}&date=${nextDate}`;
      const future_response = await fetch(future_url);
      const future_data = await future_response.json();
      console.log(future_data);
      setSearchTomorrowDetails(future_data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPresentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPresentDetails = async () => {
    
    const present_url = `https://api.weatherapi.com/v1/forecast.json?key=70ee421f9801416b9b0145330240902&q=London`;
    const response = await fetch(present_url);
    const data = await response.json();
    console.log(data);
    setDetails(data);

    const past_url = `https://api.weatherapi.com/v1/history.json?key=70ee421f9801416b9b0145330240902&q=London&date=${previousDate}`;
    const past_response = await fetch(past_url);
    const past_data = await past_response.json();
    console.log(past_data);
    setYesterdayDetails(past_data);

    const future_url = `https://api.weatherapi.com/v1/history.json?key=70ee421f9801416b9b0145330240902&q=London&date=${nextDate}`;
    const future_response = await fetch(future_url);
    const future_data = await future_response.json();
    console.log(future_data);
    setTomorrowDetails(future_data);

    setLoading(false);
  };

  return (
    <>
      <div>
        <nav>
          <div className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="currentColor"
                  className="bi bi-rainbow"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.5a7 7 0 0 0-7 7 .5.5 0 0 1-1 0 8 8 0 1 1 16 0 .5.5 0 0 1-1 0 7 7 0 0 0-7-7zm0 2a5 5 0 0 0-5 5 .5.5 0 0 1-1 0 6 6 0 1 1 12 0 .5.5 0 0 1-1 0 5 5 0 0 0-5-5zm0 2a3 3 0 0 0-3 3 .5.5 0 0 1-1 0 4 4 0 1 1 8 0 .5.5 0 0 1-1 0 3 3 0 0 0-3-3zm0 2a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 4 0 .5.5 0 0 1-1 0 1 1 0 0 0-1-1z" />
                </svg>
                Weather
              </a>

              <form
                className="d-flex"
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  setLoading(true);
                  handleSearchSubmit();
                }}
              >
                
                
<div class="dropdown">
  <input className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => setLocation(event.target.value)} data-bs-toggle="dropdown" aria-expanded="false">
</input> 
  <ul class="dropdown-menu">
  {recentSearches.map((search, index) => 
           {return <li className="p-2 text-muted bg-light text-uppercase m-2" key={index}>{search}</li>}
)}
  </ul>
</div>

                
                  
                <button className="btn btn-outline-light" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
      {loading ? (
        <Spinner />
      ) : searchDetails && searchYesterdayDetails && searchTomorrowsDtails ? (
        <>
          <div className="container">
            <div className="p-3 pb-md-4 mx-auto text-center">
              <h1>
                Weather of {searchDetails.location.name},
                {searchDetails.location.region},{searchDetails.location.country}
              </h1>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h3 className="card-header px-0 text-center">Yesterday</h3>
                    <h5 className="card-header px-0 text-center">
                      {previousDate}
                    </h5>
                    <h5 className="card-text my-2">
                      Temp:
                      {
                        searchYesterdayDetails.forecast.forecastday[0].day
                          .avgtemp_c
                      }
                      <span>&#8451;</span>
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Min Temp:
                      {
                        searchYesterdayDetails.forecast.forecastday[0].day
                          .mintemp_c
                      }
                      <span>&#8451;</span>
                    </h6>
                    <h6 className="card-text my-2 px-4">
                      Max Temp:
                      {
                        searchYesterdayDetails.forecast.forecastday[0].day
                          .maxtemp_c
                      }
                      <span>&#8451;</span>
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Humidity:
                      {
                        searchYesterdayDetails.forecast.forecastday[0].day
                          .avghumidity
                      }
                      %
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Cloud Ppt:
                      {
                        searchYesterdayDetails.forecast.forecastday[0].day
                          .totalprecip_mm
                      }
                      %
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Wind:
                      {
                        searchYesterdayDetails.forecast.forecastday[0].day
                          .maxwind_kph
                      }
                      km/h
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h3 className="card-header px-0 text-center">Today</h3>
                    <h5 className="card-header px-0 text-center">
                      {currentDate}
                    </h5>
                    <h5 className="card-text my-2">
                      Temp: {searchDetails.current.temp_c}
                      <span>&#8451;</span>
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Min Temp:
                      {searchDetails.forecast.forecastday[0].day.mintemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h6 className="card-text my-2 px-4">
                      Max Temp:
                      {searchDetails.forecast.forecastday[0].day.maxtemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Humidity: {searchDetails.current.humidity}%
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Cloud Ppt: {searchDetails.current.cloud}%
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Wind: {searchDetails.current.wind_kph}km/h
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Wind Degrees: {searchDetails.current.wind_degree}&deg;
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Status: {searchDetails.current.condition.text}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h3 className="card-header px-0 text-center">Tomorrow</h3>
                    <h5 className="card-header px-0 text-center">{nextDate}</h5>
                    <h5 className="card-text my-2">
                      Temp:
                      {
                        searchTomorrowsDtails.forecast.forecastday[0].day
                          .avgtemp_c
                      }
    
                      <span>&#8451;</span>
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Min Temp:
                      {
                        searchTomorrowsDtails.forecast.forecastday[0].day
                          .mintemp_c
                      }
                      <span>&#8451;</span>
                    </h6>
                    <h6 className="card-text my-2 px-4">
                      Max Temp:
                      {
                        searchTomorrowsDtails.forecast.forecastday[0].day
                          .maxtemp_c
                      }
                      <span>&#8451;</span>
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Humidity:
                      {
                        searchTomorrowsDtails.forecast.forecastday[0].day
                          .avghumidity
                      }
                      %
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Cloud Ppt:
                      {
                        searchTomorrowsDtails.forecast.forecastday[0].day
                          .totalprecip_mm
                      }
                      %
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Wind:
                      {
                        searchTomorrowsDtails.forecast.forecastday[0].day
                          .maxwind_kph
                      }
                      km/h
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="p-3 pb-md-4 mx-auto text-center">
              <h1>
                Weather of {details.location.name}, {details.location.region},
                {details.location.country}
              </h1>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h3 className="card-header px-0 text-center">Yesterday</h3>
                    <h5 className="card-header px-0 text-center">
                      {previousDate}
                    </h5>
                    <h5 className="card-text my-2">
                      Temp:
                      {yesterdayDetails.forecast.forecastday[0].day.avgtemp_c}
                      <span>&#8451;</span>
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Min Temp:
                      {yesterdayDetails.forecast.forecastday[0].day.mintemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h6 className="card-text my-2 px-4">
                      Max Temp:
                      {yesterdayDetails.forecast.forecastday[0].day.maxtemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Humidity:
                      {yesterdayDetails.forecast.forecastday[0].day.avghumidity}
                      %
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Cloud Ppt:
                      {
                        yesterdayDetails.forecast.forecastday[0].day
                          .totalprecip_mm
                      }
                      %
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Wind:
                      {yesterdayDetails.forecast.forecastday[0].day.maxwind_kph}
                      km/h
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h3 className="card-header px-0 text-center">Today</h3>
                    <h5 className="card-header px-0 text-center">
                      {currentDate}
                    </h5>
                    <h5 className="card-text my-2">
                      Temp: {details.current.temp_c}
                      <span>&#8451;</span>
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Min Temp: {details.forecast.forecastday[0].day.mintemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h6 className="card-text my-2 px-4">
                      Max Temp: {details.forecast.forecastday[0].day.maxtemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Humidity: {details.current.humidity}%
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Cloud Ppt: {details.current.cloud}%
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Wind: {details.current.wind_kph}km/h
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Wind Degrees: {details.current.wind_degree}&deg;
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Status: {details.current.condition.text}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h3 className="card-header px-0 text-center">Tomorrow</h3>
                    <h5 className="card-header px-0 text-center">{nextDate}</h5>
                    <h5 className="card-text my-2">
                      Temp:
                      {tomorrowsDtails.forecast.forecastday[0].day.avgtemp_c}
                      <span>&#8451;</span>
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Min Temp:
                      {tomorrowsDtails.forecast.forecastday[0].day.mintemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h6 className="card-text my-2 px-4">
                      Max Temp:
                      {tomorrowsDtails.forecast.forecastday[0].day.maxtemp_c}
                      <span>&#8451;</span>
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Humidity:
                      {tomorrowsDtails.forecast.forecastday[0].day.avghumidity}%
                    </h5>
                    <h6 className="card-text my-2 px-4">
                      Cloud Ppt:
                      {
                        tomorrowsDtails.forecast.forecastday[0].day
                          .totalprecip_mm
                      }
                      %
                    </h6>
                    <h5 className="card-text my-2 mt-3">
                      Wind:
                      {tomorrowsDtails.forecast.forecastday[0].day.maxwind_kph}
                      km/h
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

{/* ----------------------------------------------------- */}
{/* <div>
        <h3>Recent Searches</h3>
        <ul>
          
        </ul>
      </div> */}
    </>
  );
}
