import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostContainer from "./PostContainer";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../../../redux/modules/posts";
import { useLocation, useNavigate } from "react-router-dom";
import Reservation_Topimage from "../../Layout/Reservation_Topimage";
import CusttomButton from "../../Tools/CusttomButton";
import Pagination from "react-js-pagination";

const PostsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.posts);

  const data = [...posts].reverse();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <PostsWrap>
      <Reservation_Topimage></Reservation_Topimage>
      <CommentsWrap>
        <TableHeader>
          <HeaderTh Width="80px">번호</HeaderTh>
          <HeaderTh Width="560px">제목</HeaderTh>
          <HeaderTh Width="100px">상태</HeaderTh>
          <HeaderTh Width="130px">작성자</HeaderTh>
          <HeaderTh Width="130px">작성일</HeaderTh>
        </TableHeader>
        {data
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((post, index) => {
            return (
              <PostContainer
                key={post.id}
                post={post}
                index={(page - 1) * 10 + index + 1}
              ></PostContainer>
            );
          })}
        {/* <PageNumberWrap>
          <PageNumber>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </PageNumber>
        </PageNumberWrap> */}
        <PaginationBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={items}
            totalItemsCount={posts.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          ></Pagination>
        </PaginationBox>

        <PostButtonWrap>
          <CusttomButton
            Border="none"
            BackColor="#d3c1b3"
            Color=" #fbf9f6"
            FontWeight="700"
            onClickFuntion={() => {
              navigate("/addform");
            }}
          >
            예약
          </CusttomButton>
        </PostButtonWrap>
      </CommentsWrap>
    </PostsWrap>
  );
};

export default PostsContainer;

const PaginationBox = styled.div`
  margin-top: 10px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #000000;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #a5a5a5;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
  }
`;

const PageNumberWrap = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageNumber = styled.div`
  span {
    width: 20px;
    height: 20px;
    margin: 0 7px;
    font-size: 15px;
  }
`;

const TableHeader = styled.div`
  height: 50px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  display: flex;
  flex-direction: row;
`;

const HeaderTh = styled.div`
  width: ${(props) => props.Width};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 400;
  font-size: 14px;
`;

const Title = styled.div`
  position: relative;
  margin: 0 auto;
  top: -30%;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 40px;
  line-height: 54px;
`;

const PostsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopimgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Topimg = styled.img.attrs({
  src: "images/CummunityPageimg/top_img.png",
})`
  width: 100%;
  min-height: 500px;
  object-fit: cover;
`;

const CommentsWrap = styled.div`
  width: 1000px;
  min-width: 500px;
  min-height: 60vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const PostButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-bottom: 40px;
`;
