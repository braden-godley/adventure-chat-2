import { AppContext } from "@/store";
import { useContext, useState } from "react";

const StartAdventureView = () => {
    const [character, setCharacter] = useState("");
    const { state, dispatch } = useContext(AppContext);

    const startAdventure = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({
            type: "start_adventure",
            payload: {
                adventureTitle: "Test adventure!",
                firstMessage: {
                    role: "assistant",
                    content: "hello!",
                },
                characterName: character,
            }
        });
    };

    return (
        <form className="p-4">
            <div className="pb-2">
                <input className="border" type="text" placeholder="Choose a name for your character" onChange={(e) => setCharacter(e.target.value)} value={character} />
            </div>
            <button className="px-2 py-1.5 bg-blue-400 rounded" type="submit" onClick={(e) => startAdventure(e)}>Start Adventure</button>
        </form>
    );
};

export default StartAdventureView;
