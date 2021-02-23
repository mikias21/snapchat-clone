// css
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

// redux
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";

// material UI
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";

// css
import "../style/Preview.css";

// firebase
import { storage, db } from "../firebase";
import firebase from "firebase";

// redux
import { selectUser } from "../features/appSlice";

function Preview() {
  const imageSrc = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!imageSrc) history.replace("/");
  }, [imageSrc, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`snapchatposts/${id}`)
      .putString(imageSrc, "data_url");
    // check complition and do something
    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("snapchatposts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("snapchat_posts").add({
              imageUrl: url,
              username: "Mikias",
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={imageSrc} />
      <div className="preview__footer" onClick={sendPost}>
        <h2 onClick={sendPost}>send now</h2>
        <SendIcon
          className="preview__sendIcon"
          fontSize="small"
          onClick={sendPost}
        />
      </div>
    </div>
  );
}

export default Preview;
