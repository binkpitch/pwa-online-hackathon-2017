import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import {
  Dimmer,
  Loader,
  Image,
  Divider,
  Comment,
  Modal,
  Button,
  Form,
  Grid,
  Icon,
  Card,
  List
} from "semantic-ui-react";
import FileUploader from "react-firebase-file-uploader";

class CandidateComplainContainer extends Component {
  state = {
    avatar: "",
    complains: {},
    candidate: {},
    isLoading: true,
    isUploading: false,
    imageUrl: "",
    progress: 0,
    title: "",
    detail: "",
    isOpen: false
  };

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  getData() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`complains/${this.props.candidateId}`)
        .orderByChild("date")
        .once("value", snapshot => {
          resolve(snapshot.val());
        });
    })
      .then(complains => {
        return new Promise((resolve, reject) => {
          firebase
            .database()
            .ref(`candidates/${this.props.candidateId}`)
            .once("value", snapshot => {
              this.setState({
                complains,
                candidate: snapshot.val(),
                isLoading: false
              });
              resolve({ complains, candidate: snapshot.val() });
            });
        });
      })
      .catch(error => {
        console.errror("Error", error);
        window.alert("Can't get data from server");
      });
  }

  componentDidMount() {
    this.getData();

    firebase
      .database()
      .ref(`complains/${this.props.candidateId}`)
      .orderByChild("date")
      .on("value", snapshot => {
        console.log("Snapshot", snapshot.val());
        this.setState({ complains: snapshot.val() });
      });
  }

  _renderCandidate() {
    return (
      <Card centered>
        <Image src={this.state.candidate.image} height={300} />
        <Card.Content>
          <Card.Header>
            {this.state.candidate.name}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              No.{this.state.candidate.no}-{this.state.candidate.party}
            </span>
          </Card.Meta>
          <Card.Description>
            "{this.state.candidate.vow}"
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <List bulleted>
            {this.state.candidate.policy.map((policyItem, policyKey) =>
              <List.Item key={policyKey}>{policyItem}</List.Item>
            )}
          </List>
        </Card.Content>

      </Card>
    );
  }

  _renderComplains() {
    return (
      <div>
        <Divider clearing={true} />

        {Object.keys(this.state.complains).map((key, index) => {
          return (
            <div key={index}>
              <Comment>
                <Comment.Content style={{ display: "inline-grid" }}>
                  <Comment.Author
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.8em",
                      marginTop: "6px",
                      marginBottom: "8px"
                    }}
                    as="a"
                  >
                    {this.state.complains[key].title}
                  </Comment.Author>
                  <Comment.Text>
                    {this.state.complains[key].detail}
                  </Comment.Text>

                </Comment.Content>
                <Image
                  floated={"right"}
                  style={{ width: 160, height: 110, objectFit: "contain" }}
                  src={this.state.complains[key].image}
                />
                <Divider clearing={true} />

              </Comment>

            </div>
          );
        })}
      </div>
    );
  }

  handleUploadStart() {
    this.setState({ isUploading: true, progress: 0, imageUrl: "" });
  }

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("complains")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageUrl: url });
      });
  };

  handleProgress(progress) {
    this.setState({ progress });
  }

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newPostKey = firebase
      .database()
      .ref("/complains/" + this.props.candidateId)
      .push().key;
    let postData = {
      title: this.state.title,
      detail: this.state.detail,
      image: this.state.imageUrl,
      date: new Date().getTime()
    };

    let updates = {};
    updates[`/complains/${this.props.candidateId}/${newPostKey}`] = postData;
    this.close();
    return firebase.database().ref().update(updates);
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  render() {
    return (
      <div>
        <Dimmer active={this.state.isLoading} inverted>
          <Loader content="Loading" />
        </Dimmer>

        <Grid container divided>
          <Grid.Row>
            <Grid.Column>

              <Modal
                size={"small"}
                open={this.state.isOpen}
                onOpen={() => this.open()}
                trigger={
                  <Button floated={"right"} color={"red"}>Report</Button>
                }
              >
                <Modal.Header>Report</Modal.Header>
                <Modal.Content>

                  <Form>
                    <Form.Field>
                      <label>
                        Title <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        placeholder="Title"
                        value={this.state.title}
                        onChange={e => this.handleChange(e, "title")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>
                        Detail <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        placeholder="Detail"
                        value={this.state.detail}
                        onChange={e => this.handleChange(e, "detail")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>
                        Upload image{" "}
                        <span style={{ color: "red" }}>
                          *
                        </span>{" "}
                        {" "}
                        {this.state.isUploading
                          ? <Icon size={"large"} loading name="spinner" />
                          : null}
                        {this.state.imageUrl
                          ? <Icon
                              size={"large"}
                              style={{ color: "green" }}
                              name="check circle outline"
                            />
                          : null}
                      </label>
                      <FileUploader
                        accept="image/*"
                        name="avatar"
                        filename={file => this.guid()}
                        storageRef={firebase.storage().ref("complains")}
                        onUploadStart={() => this.handleUploadStart()}
                        onUploadError={() => this.handleUploadError()}
                        onUploadSuccess={filename =>
                          this.handleUploadSuccess(filename)}
                        onProgress={() => this.handleProgress()}
                      />

                    </Form.Field>

                    <Button
                      primary
                      disabled={
                        !this.state.title ||
                        !this.state.detail ||
                        !this.state.imageUrl
                      }
                      onClick={e => this.handleSubmit(e)}
                    >
                      Send
                    </Button>
                    <Button color={"red"} onClick={() => this.close()}>
                      Cancel
                    </Button>
                  </Form>

                </Modal.Content>
              </Modal>

            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              {!this.state.isLoading && this.state.candidate
                ? this._renderCandidate()
                : <div>No data</div>}
            </Grid.Column>
            <Grid.Column width={12}>
              {!this.state.isLoading && this.state.complains
                ? this._renderComplains()
                : <div>No data</div>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

CandidateComplainContainer.propTypes = {
  candidateId: PropTypes.string
};

export default CandidateComplainContainer;
