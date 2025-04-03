import React from "react";

export type AppState = {
    state: "home" | "chat";
    chatHistory: Array<Message>;
};

export type Message = {
    role: "user" | "assistant";
    content: string;
};

export type AppAction =
    | {
          type: "add_message";
          payload: Message;
      }
    | {
          type: "reset";
      };

export const initialState: AppState = {
    state: "home",
    chatHistory: [],
};

export const reducer = (state: AppState, action: AppAction): AppState => {
    if (action.type === "reset") {
        return initialState;
    } else if (action.type === "add_message") {
        return {
            ...state,
            chatHistory: [...state.chatHistory, action.payload],
        };
    }
    return state;
};

export type AppDispatch = (action: AppAction) => void;

type AppContextObj = {
    state: AppState;
    dispatch: AppDispatch;
};

export const AppContext = React.createContext<AppContextObj>({
    state: initialState,
    dispatch: () => {},
});
