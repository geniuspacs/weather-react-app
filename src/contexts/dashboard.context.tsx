import { createContext } from "react";

export interface DashboardContextModel{
    selectedCity: string | null;
    setSelectedCity: Function
};

const DashboardContext = createContext<DashboardContextModel>({
    selectedCity: null,
    setSelectedCity: () => {}
});

export default DashboardContext;