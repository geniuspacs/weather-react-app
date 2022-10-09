import { LocationForecast } from "./location";

export interface ConditionDayDetail {
    code: number;
    icon: string;
    text: string;
}

export interface ForecastHourDetail {
    chance_of_rain: number;
    chance_of_snow: number;
    cloud: number;
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

export interface ForecastDayDetail {
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

export interface ForecastAstro {
    moon_illumination: "79"
    moon_phase: "Waxing Gibbous"
    moonrise: "07:00 PM"
    moonset: "05:14 AM"
    sunrise: "08:17 AM"
    sunset: "07:48 PM"
}

export interface ForecastDay {
    astro: ForecastAstro;
    date: string;
    date_epoch: string;
    day: ForecastDayDetail;
    hour: ForecastHourDetail[];
}

export interface Forecast {
    forecastday: ForecastDay[];
}

export interface ForecastWeather {
    forecast: Forecast;
    location: LocationForecast;
}