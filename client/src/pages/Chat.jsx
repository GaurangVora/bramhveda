import { useEffect, useRef, useState } from "react";
import { Container, Form, Button, InputGroup, Card } from "react-bootstrap";
import Message from "../components/Message";
import { useGetChat, useSendMessage } from "../service/api";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const messagesEndRef = useRef(null);

  // const { data, isLoading, error, refetch } = useGetChat(chatId);

  const { mutate: sendMessage, isPending } = useSendMessage({
    onSuccess: (response) => {
      setChatId(response.data.chatId);
      setMessages((prev) => {
        prev.pop();
        return [
          ...prev,
          { id: Date.now(), text: response.data.message, replyBy: "SYSTEM" },
        ];
      });
    },
    onError: () => {
      setMessages((prev) => {
        prev.pop();
        return [
          ...prev,
          {
            id: Date.now(),
            text: "Something has gone wrong! Please try again.",
            replyBy: "SYSTEM",
          },
        ];
      });
    },
  });

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    sendMessage({ message: newMessage, chatId: chatId ? chatId : undefined });
    setMessages([
      ...messages,
      { id: Date.now(), text: newMessage },
      { id: Date.now(), text: "", isPending: true, replyBy: "SYSTEM" },
    ]);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   if (chatId) {
  //     refetch(chatId);
  //     location.href = `${location.href}${chatId}`;
  //   }
  // }, [chatId]);

  return (
    <>
      <Container
        className="d-flex flex-column"
        style={{ height: "90vh", maxWidth: "600px", marginTop: "10px" }}
      >
        <Card className="flex-grow-1 mb-2">
          <Card.Body style={{ overflowY: "auto", height: "100%" }}>
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <Message
                  name={msg.replyBy}
                  text={msg.text}
                  isLoading={msg.isPending}
                />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Card.Body>
        </Card>

        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={handleSend} disabled={isPending}>
              Send
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </>
  );
}
