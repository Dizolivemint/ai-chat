"use client";
import Header from "@/components/header";
import Chat from "@/components/chat";
import { useChat } from "ai/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Context } from "@/components/Context";

const Page: React.FC = () => {
  const [gotMessages, setGotMessages] = useState(false);
  const [context, setContext] = useState<string[] | null>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async () => {
      setGotMessages(true);
    },
  });

  const prevMessagesLengthRef = useRef(messages.length);
  
  useEffect(() => {
    const getContext = async () => {
      const response = await fetch("/api/context", {
        method: "POST",
        body: JSON.stringify({
          messages,
          indexName: "blackboard-developer",
        }),
      });
      const { context } = await response.json();
      setContext(context.map((c: any) => c.id));
    };
    if (gotMessages && messages.length >= prevMessagesLengthRef.current) {
      getContext();
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, gotMessages]);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setContext(null);
    setGotMessages(false);
  };

  return (
    <div>
      <Header className="mb-8"/>
      <div className="flex items-center justify-center text-gray-200 text-2xl">
        <Chat
          input={input}
          handleInputChange={handleInputChange}
          handleMessageSubmit={handleMessageSubmit}
          messages={messages}
          indexName="blackboard-developer"
        />
        <div className="hidden absolute transform translate-x-full transition-transform duration-500 ease-in-out right-0 w-2/3 h-full bg-gray-700 overflow-y-auto lg:static lg:translate-x-0 lg:w-2/5 lg:mx-2 rounded-lg">
          <Context className="" selected={context} />
        </div>
      </div>
    </div>
  );
};

export default Page;