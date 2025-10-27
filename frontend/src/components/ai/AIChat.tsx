import "../styles/AIChat.css"
import {useState} from "react";

type AiChatProps = {
    language: string;
}

export default function AIChat(props: Readonly<AiChatProps>){
    const [userInput, setUserInput] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        setIsLoading(true);

        // TODO: API-Call zur KI hier einfügen
        // Beispiel:
        // const response = await fetch('/api/ai-chat', {
        //     method: 'POST',
        //     body: JSON.stringify({ message: userInput })
        // });
        // const data = await response.json();
        // setAiResponse(data.response);

        // Dummy-Response für Demo
        setTimeout(() => {
            setAiResponse(`Echo: ${userInput}`);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return(
        <div className="ai-chat-container">
            <h2>AI Chat</h2>

            <div className="ai-chat-content">
                <form onSubmit={handleSubmit} className="ai-input-section">
                    <label htmlFor="user-input">Your Question:</label>
                    <textarea
                        id="user-input"
                        className="ai-input-field"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        rows={4}
                    />
                    <button
                        type="submit"
                        className="ai-submit-button button-blue"
                        disabled={isLoading || !userInput.trim()}
                    >
                        {isLoading ? "Processing..." : "Send"}
                    </button>
                </form>

                {(aiResponse || isLoading) && (
                    <div className="ai-response-section">
                        <label>AI Response:</label>
                        <div className="ai-response-box">
                            {isLoading ? (
                                <p className="ai-loading">Thinking...</p>
                            ) : (
                                <p>{aiResponse}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}