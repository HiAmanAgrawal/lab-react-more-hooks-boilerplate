import React from 'react';
import { ACTION_TYPE } from '../src/App';

export default function NewPost({ post, dispatch }) {
  return (
    <div className='newPost'>
      <div>
        {post.toggle ? <h3>{post.name}</h3> : <h3>The Content is hidden</h3>}
      </div>
      <button onClick={() => dispatch({ type: ACTION_TYPE.TOGGLE, payload: { id: post.id } })}>
        TOGGLE
      </button>
    </div>
  );
}
