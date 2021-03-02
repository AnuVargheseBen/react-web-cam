import axios from "axios";
import React from "react";
import Webcam from "react-webcam";
import "./camera.css";

type ImgSize = { width?: number; height?: number };

interface state {
  screenshot: string | null;
  imgSize: ImgSize;
  isRequesting: boolean;
}

interface Props {}

class WebCamCapture extends React.Component<Props, state> {
  webcam: any;
  state: state;
  onClick: any;

  constructor(props: Props) {
    super(props);
    this.webcam = null;
    this.state = {
      screenshot: null,
      imgSize: {},
      isRequesting: false,
    };
  }

  handleBack = () => {
    this.setState({ screenshot: null });
  };

  handleSendImage = () => {
    this.setState({ isRequesting: true });
    axios
      .post("http://localhost:3333/screenshot", {
        base64Img: this.state.screenshot,
        imgSize: this.state.imgSize,
      })
      .then((res) => {
        this.setState({ screenshot: null });
      })
      .catch((err) => {
        alert("Some technical issue please contact admin.");
        this.setState({ screenshot: null });
      })
      .finally(() => {
        this.setState({ isRequesting: false });
      });
  };

  handleScreenshot = () => {
    var screenshot = this.webcam.getScreenshot();
    const { clientHeight, clientWidth } = this.webcam.video;
    let newImgSize: ImgSize = {};
    if (clientHeight > clientWidth) {
      newImgSize.width = clientWidth;
    } else {
      newImgSize.height = clientHeight;
    }

    this.setState({
      screenshot: screenshot,
      imgSize: newImgSize,
    });
  };

  render() {
    const videoConstraints = {
      facingMode: "user",
    };

    return (
      <div>
        <div className="rectangle">
          {this.state.screenshot ? (
            <div className="img_container">
              <img {...this.state.imgSize} src={this.state.screenshot} />
            </div>
          ) : (
            <Webcam
              id="camera"
              audio={false}
              ref={(webcamRef: any) => (this.webcam = webcamRef)}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
              minScreenshotHeight={200}
            />
          )}
        </div>
        
        <div className="footer">
          <button
            disabled={!this.state.screenshot}
            className="button back"
            onClick={this.handleBack}
          >
            Abbruch
          </button>

          <button
            disabled={!!this.state.screenshot}
            className="button screenshot"
            onClick={this.handleScreenshot}
          ></button>

          <button
            disabled={!this.state.screenshot || this.state.isRequesting}
            className="button send"
            onClick={this.handleSendImage}
          >
            Fertig
            {this.state.isRequesting ? (
              <img className="loading" src={"/loading.svg"} />
            ) : (
              ""
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default WebCamCapture;
