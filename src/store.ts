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
          outcome: "DEFEATED" | "CONTINUE" | "VICTORY";
      };

export type Message = {
    role: "user" | "assistant";
    content: string;
};

export type AppAction =
    | {
          type: "add_message";
          payload: {
              user: Message;
              storyteller: Message;
              outcome: "DEFEATED" | "CONTINUE" | "VICTORY";
          };
      }
    | {
          type: "reset";
      }
    | {
          type: "retry";
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
    } else if (action.type === "retry") {
        if (state.state !== "chat") {
            return state;
        }
        return {
            ...state,
            chatHistory: state.chatHistory.slice(0, -2), // Remove last two messages
            outcome: "CONTINUE"
        };
    } else if (action.type === "add_message") {
        if (state.state !== "chat") {
            return state;
        }

        return {
            ...state,
            state: "chat",
            chatHistory: [
                ...state.chatHistory,
                action.payload.user,
                action.payload.storyteller,
            ],
            outcome: action.payload.outcome,
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
            outcome: "CONTINUE",
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
