import { useEffect, useState } from "react";
import DashboardContext from "../../contexts/dashboard.context";
import ToolbarWeather from "../shared/toolbar-weather/toolbar-weather";
import { Image } from 'primereact/image';
import * as moment from 'moment';

interface ConditionDayDetail {
    code: number;
    icon: string;
    text: string;
}

interface ForecastHourDetail {
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    time: string;
    time_epoch: number;
    vis_km: number;
    vis_miles: number;
    will_it_rain: number;
    will_it_snow: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
    condition: ConditionDayDetail;
}

interface ForecastDayDetail {
    avghumidity: 54
    avgtemp_c: 20.9
    avgtemp_f: 69.7
    avgvis_km: 10
    avgvis_miles: 6
    maxtemp_c: 25.2
    condition: ConditionDayDetail;
    maxtemp_f: 77.4
    maxwind_kph: 10.4
    maxwind_mph: 6.5
    mintemp_c: 16.6
    mintemp_f: 61.9
    totalprecip_in: 0
    totalprecip_mm: 0
    uv: 0
}

interface ForecastAstro {
    moon_illumination: "79"
    moon_phase: "Waxing Gibbous"
    moonrise: "07:00 PM"
    moonset: "05:14 AM"
    sunrise: "08:17 AM"
    sunset: "07:48 PM"
}

interface ForecastDay {
    astro: ForecastAstro;
    date: string;
    date_epoch: string;
    day: ForecastDayDetail;
    hour: ForecastHourDetail[];
}

interface Forecast {
    forecastday: ForecastDay[];
}

interface LocationForecast {
    country: string;
    lat: number;
    long: number;
    localtime: string;
    localtime_epoch: number;
    name: string;
    region: string;
    tz_id: string;
};

interface ForecastWeather {
    forecast: Forecast;
    location: LocationForecast;
}

const Dashboard = () => {

    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const [cityDetails, setCityDetails] = useState<ForecastWeather | null>(null);

    const [currentWeather, setCurrentWeather] = useState<ForecastHourDetail | null>();

    // TODO: Meter en environment
    const dateFormat: string = 'DD/MM/YYYY';
    const lang: string = 'es';

    const currentDate: string = moment().format(dateFormat);

    useEffect(() => {
        if(selectedCity) {
            searchCity();
        }
    }, [selectedCity]);

    const searchCity = () => {
        // TODO: Meter en environment
        fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${selectedCity}&dt=${currentDate}&lang=${lang}`, {
            headers: {
                'X-RapidAPI-Key': '2958f49cd2msh3f1e8ba71d48a75p193ea9jsn6629d4455884',
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
            const differencesWithCurrentDatetime = result.forecast.forecastday[0].hour.map(({time_epoch}) => moment().diff(time_epoch, 'milliseconds'));
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
                        <h2 className="text-center">{currentWeather.condition.text} en {cityDetails.location.name}, {cityDetails.location.region} ({cityDetails.location.country})</h2>
                        <div className="d-flex">
                            <div className="col"></div>
                            <div className="col align-items-center">
                                <div className="flex align-items-center justify-content-center" style={{
                                    fontSize: "60px"
                                }}>
                                    <Image 
                                        src={currentWeather.condition.icon} 
                                        alt={currentWeather.condition.text} 
                                        width='100px'
                                    />
                                    <span>
                                        {currentWeather.temp_c} &deg;C
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                    </>
                }
            </DashboardContext.Provider>
        </>
    );
};

export default Dashboard;