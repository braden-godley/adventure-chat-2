import { AppContext, initialState, reducer } from "@/store";
import { useReducer } from "react";

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div></div>
        </AppContext.Provider>
    );
}

export default Home;
