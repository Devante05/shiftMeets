import React, {useEffect} from "react";
import { ListItem, List } from "../List";
import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import {GET_POSTS, REMOVE_POST} from "../../utils/actions";

const PostsList = () => {

  const [state, dispatch] = useStoreContext();

  const getPosts = async () => {
    try {
      const response = await API.getPosts();

      dispatch({
        type: GET_POSTS,
        posts: response.data
      });

    } catch(error) {
      console.log(error);
    }
  };

  const removePost = async id => {
    try {
      const response = await API.deletePost(id);

      dispatch({
        type: REMOVE_POST,
        _id: id
      });

    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>All Car Meets</h1>
      <h3 className="mb-5 mt-5">Click on a post to view</h3>
      {/* Replace `[]` with the appropriate arrays */}
      {state.posts.length ? (
        <List>
          {state.posts.map(post => (
            <ListItem key={post._id}>
              <Link to={"/posts/" + post._id}>
                <strong>
                  {post.location} by {post.author}
                </strong>
              </Link>
              <DeleteBtn onClick={() => {removePost(post._id)}} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3 >You haven't added any posts yet!</h3>
      )}
      <div className="mt-5">
        <Link className = "text-dark" to="favorites">View favorites</Link>
      </div>
    </div>
  );
};

export default PostsList;
