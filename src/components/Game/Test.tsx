import { useEffect } from "react";

interface Props {
  socket: any;
}

const Test = ({ socket }: Props) => {
  useEffect(() => {
    socket.emit("send_message", "value");
    console.log("send");
  }, []);
  return <div></div>;
};

export default Test;
