import { useReducer, useState, useRef } from 'react';
import NewPost from '../components/NewPost';

export const ACTION_TYPE = {
  ADD_POST: 'addPost',
  TOGGLE: 'toggle'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case ACTION_TYPE.TOGGLE:
      const updatedPosts = state.posts.map((post) =>
        post.id === action.payload.id ? { ...post, toggle: !post.toggle } : post
      );
      return { ...state, posts: updatedPosts };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { posts: [] });
  const [inputValue, setInputValue] = useState('');
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { id: Date.now(), name: inputValue, toggle: true };
    dispatch({ type: ACTION_TYPE.ADD_POST, payload: newPost });
    setInputValue('');
  };

  function focus() {
    ref.current.focus();
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          ref={ref}
          placeholder='Type something'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button type='submit'>Add</button>
      </form>

      {state.posts.map((post) => (
        <NewPost key={post.id} post={post} dispatch={dispatch} />
      ))}
      <button onClick={focus}>Get Back</button>
    </div>
  );
}

export default App;
