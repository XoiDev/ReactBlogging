import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import slugify from "slugify";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: white;
      margin-left: auto;
    }
    
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetch() {
      if (data.userId) {
        const docRef = doc(db, "categories", data.categoryId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data) {
          setCategory(docSnap.data());
        }
      }
    }
    fetch();
  }, [data.categoryId]);

  useEffect(()=>{
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, "users", data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data) {
          setUser(docSnap.data()) 
          console.log(docSnap.data());
        }
      }
    }
    fetchUser();
  }, [data.userId])
  if (!data || !data.id) return null
  const date = data?.createdAt?.seconds ?  new Date(data?.createdAt?.seconds * 1000): new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI")
  return (
    <PostFeatureItemStyles>
      <PostImage alt="unsplash" url={data.image}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory>{category?.name}</PostCategory>
          <PostMeta date={formatDate} to={slugify(user?.fullname || '' )} authorName={user?.fullname}></PostMeta>
        </div>
        <PostTitle size="big">{data.title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;