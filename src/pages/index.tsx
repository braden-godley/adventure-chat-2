import ChatView from "@/components/ChatView";
import Navbar from "@/components/Navbar";
import StartAdventureView from "@/components/StartAdventureView";
import { AppContext, initialState, reducer } from "@/store";
import { useReducer } from "react";

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Navbar />
            <div className="container mx-auto">
                {state.state === "home" && <StartAdventureView />}
                {state.state === "chat" && <ChatView />}
            </div>
        </AppContext.Provider>
    );
}

export default Home;
