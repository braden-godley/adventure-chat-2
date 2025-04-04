import ChatView from "@/components/ChatView";
import Navbar from "@/components/Navbar";
import StartAdventureView from "@/components/StartAdventureView";
import { AppContext, initialState, reducer } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReducer } from "react";

const queryClient = new QueryClient();

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={{ state, dispatch }}>
                <div className="flex flex-col h-screen">
                    <Navbar />
                    <div className="max-w-4xl mx-auto py-8 px-4 flex-1">
                        {state.state === "home" && <StartAdventureView />}
                        {state.state === "chat" && <ChatView />}
                    </div>
                </div>
            </AppContext.Provider>
        </QueryClientProvider>
    );
}

export default Home;
