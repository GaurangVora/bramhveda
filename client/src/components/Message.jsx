import { Card, Spinner } from "react-bootstrap";

export default function Message({ name, text, isLoading }) {
  const isMe = name !== "SYSTEM";

  return (
    <div
      className={`d-flex ${
        isMe ? "justify-content-end" : "justify-content-start"
      } mb-2`}
      style={{ "text-align": "left" }}
    >
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <Card
          bg={isMe ? "primary" : "light"}
          text={isMe ? "white" : "dark"}
          style={{ maxWidth: "75%" }}
          className="px-3 py-2"
        >
          <Card.Text className="mb-0">{text}</Card.Text>
        </Card>
      )}
    </div>
  );
}
