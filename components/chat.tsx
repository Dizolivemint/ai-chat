import React, { FormEvent, ChangeEvent } from "react";
import Messages from "@/components/messages";
import { Message } from "ai/react";

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
}

const Chat: React.FC<Chat> = ({
  input,
  handleInputChange,
  handleMessageSubmit,
  messages,
}) => {
  return (
    <div id="chat">
      <Messages messages={messages} />
      <>
        <form onSubmit={handleMessageSubmit}>
          <input
            type="text"
            value={input}
            className="text-black"
            onChange={handleInputChange}
          />
        </form>
      </>
    </div>
  );
};

export default Chat;