type AppState = {
    state: "home" | "chat";
    chatHistory: Array<Message>;
};

type Message = {
    role: "user" | "assistant";
};
