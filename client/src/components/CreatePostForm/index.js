import React, {useRef} from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import {ADD_POST, LOADING} from "../../utils/actions";

const CreatePostForm = () => {

  const locationRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();

  const [state, dispatch] = useStoreContext();

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch({ type: LOADING });

    try {
      const response = await API.savePost({
        location: locationRef.current.value,
        body: bodyRef.current.value,
        author: authorRef.current.value
      });

      dispatch({type: ADD_POST, post: response.data});

      // Clear out form
      locationRef.current.value = "";
      bodyRef.current.value = "";
      authorRef.current.value = "";
    } catch(error) {
      console.log(error);
    }

  };

  return (
    <div>
      <div className="jumbotron">
        <img
          className="img-fluid img-thumbnail"
          src="./images/carMeet.jpg"
        />
      </div>
      <h1>Create a meet</h1>
      <form className="form-group mt-5 mb-5" onSubmit={handleSubmit}>
        <input className="form-control mb-5" required placeholder="Location" ref={locationRef} />
        <textarea className="form-control mb-5" required placeholder="Body" ref={bodyRef} />
        <input className="form-control mb-5" placeholder="Screen name" ref={authorRef} />
        <button className="btn btn-success mt-3 mb-5" type="submit" disabled={state.loading}>
          Save Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
