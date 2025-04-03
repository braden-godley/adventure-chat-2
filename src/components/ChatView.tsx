import { AppContext } from "@/store";
import { useContext, useState } from "react";
import MessageHistory from "./MessageHistory";

const ChatView = () => {
    const { state, dispatch } = useContext(AppContext);

    if (state.state !== "chat") return;

    const newAdventure = () => {
        dispatch({ type: "reset" });
    };

    return (
        <div>
            <button className="px-2 py-1.5 border border-gray-400 rounded" onClick={newAdventure}>
                New Adventure
            </button>

            <p>You're playing as {state.characterName} in...</p>
            <h2>{state.adventureTitle}</h2>
            <MessageHistory history={state.chatHistory} />
        </div>
    );
};

export default ChatView;
