import ReactTimeAge from "react-timeago";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//style
import "../style/Chat.css";

// Material UI
import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";

// redux
import { selectImage } from "../features/appSlice";

// firebase
import { db } from "../firebase";

function Chat({ id, username, profilePic, imageUrl, read, timestamp }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const openImage = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("snapchat_posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/chats/view");
    }
  };

  return (
    <div onClick={openImage} className="chat">
      <Avatar src={profilePic} className="chat__avatar" />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to open - "}{" "}
          <ReactTimeAge date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
