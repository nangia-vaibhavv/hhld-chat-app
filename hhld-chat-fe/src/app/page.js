import Chat from "./chat/page";
import Auth from "./auth";

export default function Home() {
  return (
    <>
      <Auth />
      <Chat />
    </>
  );
}
