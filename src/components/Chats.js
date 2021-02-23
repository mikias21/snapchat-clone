import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// css
import "../style/Chats.css";

// Material UI
import { Avatar } from "@material-ui/core";
import { ChatBubble, SearchOutlined } from "@material-ui/icons";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

// firebase
import { db } from "../firebase";

// component
import Chat from "./Chat";

// reduct
import { selectUser } from "../features/appSlice";
import { resetCameraImage } from "../features/cameraSlice";

// auth
import { auth } from "../firebase";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection("snapchat_posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          className="chats__headerAvatar"
          onClick={() => auth.signOut()}
        />
        <div className="chats__headerSearch">
          <SearchOutlined className="chats__headerSearchIcon" />
          <input placeholder="Friends" />
        </div>
        <ChatBubble className="chats__headerChat" />
      </div>
      <div className="chat__posts">
        {posts.map(
          ({
            id,
            data: { imageUrl, profilePic, read, timestamp, username },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              profilePic={profilePic}
              imageUrl={imageUrl}
              read={read}
              timestamp={timestamp}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
