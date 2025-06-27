import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import Card from "../UI/molecules/PostCard";
import CommentCard from "../UI/molecules/CommentCard";
import type { CommentContextType, PostContextType, UserContextTypes } from "../../types";
import CommentContext from "../../contexts/CommentsContet";
import UserContext from "../../contexts/UsersContext";
import { useParams } from "react-router";
import PostContext from "../../contexts/PostsContext";
import { toast } from "react-toastify";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 48;
interface CollapsibleProps {
  collapsed: boolean;
}

const Container = styled.div`
  display: flex;
  overflow: hidden;
`;

const Sidebar = styled.div<CollapsibleProps>`
  width: ${({ collapsed }) => (collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)}px;
  background: #151c22;
  color: white;
  padding: 20px 10px;
  box-sizing: border-box;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: ${({ collapsed }) => (collapsed ? "center" : "flex-start")};
`;

const Content = styled.div<CollapsibleProps>`
  flex-grow: 1;
  background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
  color: white;
  padding: 20px;
  transition: margin-left 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px; // smaller padding for small screens
  }
`;


const HamburgerButton = styled.button`
  position: absolute;
  top: 45px;
  left: -25px;
  transform: translateX(-50%);
  background: #1f2d3a;
  border: none;
  border-radius: 50%;
  padding: 10px;
  margin-left: 25px;
  cursor: pointer;
  color: white;
  z-index: 10;
  &:hover {
    background: #2a3b4d;
  }
`;

const StyledCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: flex-start; 
  gap: 20px;               
  margin-top: 30px;       
   width: 100%;              // ensures it fills the Content area
  box-sizing: border-box;   // avoids overflow due to padding 
`;

const StyledPostCard = styled.div`
  background: #1a252f;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  overflow-wrap: anywhere;
  white-space: normal;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const AddCommentButton = styled.button`
  margin-top: 20px;
  background-color: #315c87;
  color: white;
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #467bb2;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: #1a252f;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90vw;   /* Responsive width */
  box-shadow: 0 0 10px black;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  resize: none;
  box-sizing: border-box;
  font-size: 14px;
  font-family: inherit;
  background-color: #2c3e50;
  color: white;
  border: none;
  outline: none;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:first-child {
    background: #444c56;
    color: white;
  }

  &:last-child {
    background: #4caf50;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const PostDetailsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { comments, fetchPostComments, addcomment } = useContext(CommentContext) as CommentContextType;
  const { posts } = useContext(PostContext) as PostContextType;
  const { id } = useParams();
  const { loggedInUser } = useContext(UserContext) as UserContextTypes;
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (id) {
       setLoadingComments(true);
      fetchPostComments(id).finally(() => setLoadingComments(false));
    }
  }, [id]);

  // const post = posts.find(post => post._id === id);
  const post = posts.find(post => String(post._id) === String(id));


  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!loggedInUser?._id  || !loggedInUser?.email || !post?._id ) { // TODO THIS !post?._id  === undefined
      toast.error("User or post information is missing.");
      return;
    }
    const commentData = {
      post_id: post._id,
      name: loggedInUser.name && loggedInUser.name.trim() ? loggedInUser.name : "Anonymous",
      text: commentText,
      email: loggedInUser.email,
      date: new Date().toISOString(),
    };
    setCommentText("");
    setShowModal(false);

    const Context_Response = await addcomment(commentData);
    if ('error' in Context_Response) {
      toast.error(Context_Response.error);
    } else {
      toast.success(Context_Response.success || 'Comment added successfully.');
    }
  };

  return (
    <Container>
      <Sidebar collapsed={collapsed}>
        {!collapsed && (
          <>
            <h2>Left Menu</h2>
            <p>Popular</p>
            <p>Answers</p>
            <p>Explore</p>
            <p>Communities</p>
          </>
        )}
      </Sidebar>

      <Content collapsed={collapsed}>
        <HamburgerButton onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </HamburgerButton>

        <PostWrapper>
          <StyledPostCard>
              {post ? (
                <>
                  <h1>{post.name}</h1>
                  <p>{post.text}</p>
                </>
              ) : (
                <p>Loading post...</p>
              )}

              {loggedInUser && (
                <AddCommentButton onClick={() => setShowModal(true)}>
                  <FaPlus /> Add Comment!
                </AddCommentButton>
              )}
          </StyledPostCard>

          {showModal && (
              <ModalOverlay>
                <ModalContent>
                  <h3>Add your comment</h3>
                  <StyledTextarea
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <ModalButtons>
                    <ModalButton onClick={() => setShowModal(false)}>Cancel</ModalButton>
                    <ModalButton onClick={handleSubmitComment}>Submit</ModalButton>
                  </ModalButtons>
                </ModalContent>
              </ModalOverlay>
            )}

          <StyledCommentsContainer>
            {loadingComments ? (
                <p>Loading comments...</p>
              ) : comments.length ? (
                comments.map(item => {
                return <CommentCard key={item._id} data={item} />;
                })
              ) : (
              <p>No comments yet.</p>
            )}
          </StyledCommentsContainer>
        </PostWrapper>
       
      </Content>
    </Container>
  );
};

export default PostDetailsPage;
