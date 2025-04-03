import React from "react";

export type AppState =
    | {
          state: "home";
      }
    | {
          state: "chat";
          adventureTitle: string;
          characterName: string;
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
      }
    | {
          type: "start_adventure";
          payload: {
              adventureTitle: string;
              firstMessage: Message;
              characterName: string;
          };
      };

export const initialState: AppState = {
    state: "home",
};

export const reducer = (state: AppState, action: AppAction): AppState => {
    if (action.type === "reset") {
        return initialState;
    } else if (action.type === "add_message") {
        if (state.state !== "chat") {
            return state;
        }

        return {
            ...state,
            state: "chat",
            chatHistory: [action.payload],
        };
    } else if (action.type === "start_adventure") {
        if (state.state === "chat") {
            return state;
        }

        return {
            state: "chat",
            adventureTitle: action.payload.adventureTitle,
            characterName: action.payload.characterName,
            chatHistory: [action.payload.firstMessage],
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
