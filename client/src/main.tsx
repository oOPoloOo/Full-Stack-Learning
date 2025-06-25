import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
// import { FooterContextProvider } from './contexts/FoooterContext.tsx';
import { UserProvider } from './contexts/UsersContext.tsx';
import { PostProvider } from './contexts/PostsContext.tsx';
import { CommentProvider } from './contexts/CommentsContet.tsx';
// import { GamesProvider } from './contexts/GamesContex.tsx';


createRoot(document.getElementById('root') as HTMLDivElement).render(
  <BrowserRouter>  
    <PostProvider>
      <CommentProvider>
        <UserProvider>
          <App />    
        </UserProvider>
      </CommentProvider> 
    </PostProvider>
  </BrowserRouter>
);

