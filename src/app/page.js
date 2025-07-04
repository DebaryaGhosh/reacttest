function Profile() {
  return (
    <img
      src="maulick.jpeg"
      alt="maulick"
    />
  );
}


function ChatBox() {
  return (
    <section>
    <Profile/>
    <h1>Message</h1>
    <textarea name="messageContent" rows={2} cols={30}/>
    </section>
  );
}
export default function Gallery() {
  return (
    <ChatBox/>
  );
}