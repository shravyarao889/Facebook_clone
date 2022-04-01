const PostReducer = (state , action ) => {
    switch (action.type) {
        case "USER_POSTS":
            return{
                ...state,
                userPosts:action.payload
            }

        case "ADD_POST":
            return{
                ...state,
                userPosts:[action.payload , ...state.userPosts],
                all_Posts:[action.payload , ...state.all_Posts]
            }

        case "ADD_COMMENT":
            let getPost = state.userPosts.find(post => post._id == action.payload.post);
            // check if post if user or not 
            if(getPost){
                state.userPosts.map(post => post._id === action.payload.post ? post.comments = [...post.comments , action.payload] : post)
            }else{
                state.all_Posts.map(post => post._id === action.payload.post ? post.comments = [...post.comments , action.payload] : post)
            }
            return{
                ...state,
            }
            
        case "LIKE_POST":
            // check if this post if signed user post or not if yes will modify it 
            let findPost = state.userPosts.find(post => post._id == action.payload._id);
            if(findPost){
                findPost.like = action.payload.like
            }else{
                findPost = state.all_Posts.find(post => post._id == action.payload._id);
                findPost.like = action.payload.like
            }
            return{
                ...state
            }
        
        case "DELETE_POST":
            return{
                ...state,
                userPosts:state.userPosts.filter(post => post._id !== action.payload)
            }

        case "FOLLOWING_POSTS":
            return{
                ...state,
                all_Posts:action.payload
            }
        default:
            return state
    }
}

export default PostReducer; 