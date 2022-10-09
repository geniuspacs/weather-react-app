import React, { useEffect, useState } from "react";
import DashboardContext from "../../contexts/dashboard.context";
import ToolbarWeather from "../shared/toolbar-weather/toolbar-weather";
import { Image } from 'primereact/image';
import * as moment from 'moment';
import { ForecastHourDetail, ForecastWeather } from "../../types/forecast";
import { WiStrongWind, WiHumidity, WiRaindrop, WiRain } from 'react-icons/wi';

const Dashboard = () => {

    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const [cityDetails, setCityDetails] = useState<ForecastWeather | null>(null);

    const [currentWeather, setCurrentWeather] = useState<ForecastHourDetail | null>();

    const currentDate: string = moment().format(import.meta.env.VITE_DEFAULT_DATE_FORMAT);

    useEffect(() => {
        if(selectedCity) {
            searchCity();
        }
    }, [selectedCity]);

    const searchCity = () => {
        fetch(`${import.meta.env.VITE_API_URL}/history.json?q=${selectedCity}&dt=${currentDate}&lang=${import.meta.env.VITE_DEFAULT_LANG}`, {
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            throw new Error("Something went wrong! 😰");
        })
        .then((result: ForecastWeather) => {
            setCityDetails(result);
            const differencesWithCurrentDatetime = result.forecast.forecastday[0].hour.map(({time}) => moment().diff(time, 'minutes')).filter((diff) => diff >= 0);
            const minimunDifference = Math.min(...differencesWithCurrentDatetime);
            const mostAccurateIndex = differencesWithCurrentDatetime.indexOf(minimunDifference);

            setCurrentWeather(result.forecast.forecastday[0].hour[mostAccurateIndex]);
            
        });
    };
    

    return (
        <>
            <DashboardContext.Provider value={{selectedCity, setSelectedCity}}>
                <ToolbarWeather />

                {selectedCity && cityDetails && currentWeather &&
                    <>
                        <div className="flex align-items-center justify-content-center">
                            <div className="flex-initial font-bold">
                                <h2>{currentWeather.temp_c} &deg;C, {currentWeather.condition.text} </h2>
                            </div>
                            <div className="flex-initial">
                            <Image 
                                src={currentWeather.condition.icon} 
                                alt={currentWeather.condition.text} 
                                width='100px'
                            />
                            </div>
                        </div>

                        <div className="flex align-items-stretch justify-content-center px-5">
                            <div className="col p-3 mx-2 align-items-center justify-content-center text-center border-white-200 border-solid">
                                <WiStrongWind fontSize={'2rem'} />
                                <h2>{currentWeather.wind_kph} km/h</h2>
                            </div>
                            <div className="col p-3 mx-2 align-items-center justify-content-center text-center border-white-200 border-solid">
                                <WiHumidity fontSize={'2rem'} />
                                <h2>{currentWeather.humidity} km/h</h2>
                            </div>
                            <div className="col p-3 mx-2 align-items-center justify-content-center text-center border-white-200 border-solid">
                                <WiRaindrop fontSize={'2rem'} />
                                <h2>{currentWeather.precip_mm} mm</h2>
                            </div>
                            <div className="col p-3 mx-2 align-items-center justify-content-center text-center border-white-200 border-solid">
                                <WiRain fontSize={'2rem'} />
                                <h2>Probabilidad de lluvia: {currentWeather.chance_of_rain} %</h2>
                            </div>
                        </div>
                    </>
                }
            </DashboardContext.Provider>
        </>
    );
};

export default Dashboard;