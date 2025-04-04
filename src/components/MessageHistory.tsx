import { AppContext, Message } from "@/store";
import { useContext } from "react";

const MessageHistory = () => {
    const { state, dispatch } = useContext(AppContext);

    if (state.state !== "chat") return;

    return (
        <div className="flex flex-col gap-2">
            {state.chatHistory.map((message, i) => <MessageView key={i} message={message} characterName={state.characterName} lastMessageIndex={i} />)}
        </div>
    );
};

export default MessageHistory;

const MessageView: React.FC<{ message: Message, characterName: string, lastMessageIndex: number }> = ({ message, characterName, lastMessageIndex }) => {
    const { dispatch } = useContext(AppContext);

    const bg = message.role === "assistant" ? "bg-secondary" : "bg-primary";
    const justify = message.role === "assistant" ? "justify-start" : "justify-end";
    return (
        <div className={`flex ${justify}`}>
            <div className={`${bg} text-white p-4 rounded-lg w-[80%] relative`}>
                {message.role === "user" && (
                    <button onClick={() => dispatch({ type: "retry", payload: { lastMessageIndex: lastMessageIndex } })} className="absolute -top-3 -right-3 w-8 h-8 bg-gray-100 rounded-full 
                                     hover:bg-gray-200 transition-colors duration-200 
                                     flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                        </svg>
                    </button>
                )}
                {message.role === "assistant" ? "Storyteller:" : `You as ${characterName}:`}
                <br />
                "{message.content}"
            </div>
        </div>
    );
};
