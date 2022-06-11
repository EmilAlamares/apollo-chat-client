const Conversation = ({selected}) => {
    return ( 
        <div className= {selected ? "conversation selected flex" : "conversation flex"}>
            <img src={"img/user-img-placeholder-2.png"} alt="" />
            <span>
                <h1>John Doe</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </span>
        </div>
     );
}
 
export default Conversation;