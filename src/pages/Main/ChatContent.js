import Message from "../../components/Message"

const ChatContent = () => {
  return (
    <div className="chat-content flex-1 flex-v">
      <Message msg={`Hey!`}/>
      <Message own={true} msg={`What's up?`}/>
      <Message msg={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam necessitatibus praesentium, sunt ex eligendi sapiente fugit, aliquam doloribus officia, eius repellat labore atque voluptatibus repudiandae. Atque quo aliquid vero autem.`}/>
      <Message own={true} msg={`What are you talking about? Atque quo aliquid vero autem. Aperiam necessitatibus praesentium, sunt ex eligendi sapiente fugit, aliquam doloribus officia, eius repellat labore atque voluptatibus repudiandae.`}/>
      <Message msg={`Okay bye!`}/>
      

    </div>
  )
}

export default ChatContent
