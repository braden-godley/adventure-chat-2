import { AppContext, Message } from "@/store";
import { useContext } from "react";

const MessageHistory = () => {
    const { state, dispatch } = useContext(AppContext);

    if (state.state !== "chat") return;

    return (
        <div className="flex flex-col gap-2">
            {state.chatHistory.map((message, i) => <MessageView key={i} message={message} characterName={state.characterName} />)}
        </div>
    );
};

export default MessageHistory;

const MessageView: React.FC<{ message: Message, characterName: string }> = ({ message, characterName }) => {
    const bg = message.role === "assistant" ? "bg-secondary" : "bg-primary";
    const justify = message.role === "assistant" ? "justify-start" : "justify-end";
    return (
        <div className={`flex ${justify}`}>
            <div className={`${bg} text-white p-4 rounded-lg w-[90%]`}>
                {message.role === "assistant" ? "Storyteller:" : `You as ${characterName}:`}
                <br />
                "{message.content}"
            </div>
        </div>
    );
};
