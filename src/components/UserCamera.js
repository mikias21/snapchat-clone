import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// redux
import { setCameraImage } from "../features/cameraSlice";

// style
import "../style/UserCamera.css";

// material UI
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";

const videoContraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function UserCamera() {
  const webCamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imageSource = webCamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSource));
    history.push("/preview");
  }, [webCamRef]);

  return (
    <div className="userCamera">
      <Webcam
        audio={false}
        height={videoContraints.height}
        ref={webCamRef}
        screenshotFormat="image/jpeg"
        width={videoContraints.width}
        videoConstraints={videoContraints}
      />
      <RadioButtonCheckedIcon
        className="userCamera__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default UserCamera;
