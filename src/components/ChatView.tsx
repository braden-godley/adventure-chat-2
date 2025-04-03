import { AppContext } from "@/store";
import { useContext, useState } from "react";
import MessageHistory from "./MessageHistory";

const ChatView = () => {
    const { state, dispatch } = useContext(AppContext);
    const [input, setInput] = useState("");

    if (state.state !== "chat") return;

    const newAdventure = () => {
        dispatch({ type: "reset" });
    };

    const submitInput = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        dispatch({
            type: "add_message",
            payload: {
                user: {
                    role: "user",
                    content: input,
                },
                storyteller: {
                    role: "assistant",
                    content: "Thats stupid af!",
                },
            }
        });
        setInput("");
    }

    return (
        <div className="space-y-4">
            <button
                className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-600 
                         rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         cursor-pointer"
                onClick={newAdventure}
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                New Adventure
            </button>

            <p className="text-lg text-gray-500 italic">
                You're playing as <span className="font-semibold text-primary">{state.characterName}</span> in...
            </p>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-8">
                "{state.adventureTitle}"
            </h2>

            <MessageHistory />

            <form onSubmit={submitInput}>
                <div className="relative">
                    <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
                                 focus:ring-2 focus:ring-primary focus:border-transparent
                                 transition-all duration-200 placeholder-gray-400"
                        type="text"
                        placeholder="What do you do?"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 
                                 bg-primary text-white rounded-md hover:bg-primary/90 
                                 transition-colors duration-200 focus:outline-none focus:ring-2 
                                 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 
                                 cursor-pointer disabled:cursor-not-allowed"
                        disabled={!input.trim()}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatView;
