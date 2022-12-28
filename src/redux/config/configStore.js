// src/redux/modules/config/configStore.js

import { configureStore } from "@reduxjs/toolkit";
/**
 * import 해온 것은 slice.reducer 입니다.
 */
import posts from "../modules/posts";
import comments from "../modules/comments";
import product_posts from "../modules/productposts";
import product_comments from "../modules/productcomments";

/**
 * 모듈(Slice)이 여러개인 경우
 * 추가할때마다 reducer 안에 각 모듈의 slice.reducer를 추가해줘야 합니다.
 *
 * 아래 예시는 하나의 프로젝트 안에서 counter 기능과 todos 기능이 모두 있고,
 * 이것을 각각 모듈로 구현한 다음에 아래 코드로 2개의 모듈을 스토어에 연결해준 것 입니다.
 */
const store = configureStore({
  reducer: {
    posts: posts,
    comments: comments,
    product_posts: product_posts,
    product_comments: product_comments,
  },
  devTools: false,
});

export default store;
