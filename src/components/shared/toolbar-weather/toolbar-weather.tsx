import { AutoComplete } from 'primereact/autocomplete';
import React, { useContext, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Image } from 'primereact/image';
import DashboardContext from '../../../contexts/dashboard.context';

interface CityModel {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

interface AutocompleteItem {
    name: string;
    code: number;
}

const ToolbarWeather = () => {

    const {setSelectedCity} = useContext(DashboardContext);

    const [searchCity, setSearchCity] = useState<string>('');
    const [cities, setCities] = useState<AutocompleteItem[]>([]);

    const getHintData = (event: {query: string}) => {
        if(event.query.length > 3) {
            fetch(`${import.meta.env.VITE_API_URL}/search.json?q=${event.query}`, {
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            })
            .then((resultApi) => {
                if(resultApi.ok) {
                    return resultApi.json();
                }
                throw new Error('Something went wrong 😰')
            })
            .then((citiesReturned: CityModel[]) => {
                setCities(citiesReturned.map(({name, id}) => ({name, code: id})));
            })
            .catch(() => new Error('Something went wrong 😰'))
        }
    };

    const searchFragment = (
        <>
            <AutoComplete
                field="name"
                value={searchCity} 
                onChange={({value}) => setSearchCity(value)}
                suggestions={cities}
                placeholder="Search your city"
                onSelect={({value}) => setSelectedCity(value.name)}
                onUnselect={() => setSelectedCity(null)}
                completeMethod={getHintData} />
        </>
    );

    const logoFragment = (
        <div className="flex align-items-center">
            <Image src="/assets/img/logo.png" alt="logo" width='60px' imageClassName='mr-4' />
            <h1>Weather APP</h1>
        </div>
    );

    return (
        <>
            <Toolbar right={searchFragment} left={logoFragment} />
        </>
    );
};

export default ToolbarWeather;