import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import Homepage from "pages/Homepage";
import NotFoundPage from "pages/PageNotFound";
import DashboardLayout from "module/dashboard/DashboardLayout";
import DashboardPage from "pages/DashboardPage";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";
import PostDetailsPage from "pages/PostDetailsPage";
import CategoryAddNew from "module/category/CategoryAddNew";
import CategoryManage from "module/category/CategoryManage";
import CategoryUpdate from "module/category/CategoryUpdate";
import UserManage from "module/user/UserManage";
import UserAddNew from "module/user/UserAddNew";
import UserUpdate from "module/user/UserUpdate";
import PostUpdate from "module/post/PostUpdate";


function App() {
  return <div>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>


        <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
             <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
             <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
             <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
             <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
               <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>


          </Route>
      </Routes>
    </AuthProvider>
  </div>;
}

export default App;
