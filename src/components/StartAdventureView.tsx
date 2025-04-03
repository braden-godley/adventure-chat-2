import { AppContext } from "@/store";
import { useContext, useState } from "react";

const StartAdventureView = () => {
    const [character, setCharacter] = useState("");
    const { state, dispatch } = useContext(AppContext);

    const startAdventure = (e: React.FormEvent) => {
        e.preventDefault();
        if (!character.trim()) return;

        dispatch({
            type: "start_adventure",
            payload: {
                adventureTitle: "Your Adventure Begins",
                firstMessage: {
                    role: "assistant",
                    content: `Welcome, ${character}! Let's begin your adventure...`,
                },
                characterName: character,
            }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={startAdventure} className="space-y-2">
                <h2 className="text-xl font-medium">Choose a name for your character</h2>

                <input
                    type="text"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    placeholder="Character Name*"
                    required
                    className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white
                             rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none 
                             focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             cursor-pointer"
                >
                    Start Adventure
                </button>
            </form>

            <div className="bg-secondary text-white p-8 rounded-lg space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">GO ON AN ADVENTURE</h2>
                    <p className="text-gray-300">
                        Choose a name for your character and experience a randomly generated adventure scenario.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">CHOOSE YOUR FATE</h2>
                    <p className="text-gray-300">
                        Make decisions for your character. Behind the scenes, Adventure Chat calculates the difficulty of your actions and rolls to see how well you do.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StartAdventureView;
