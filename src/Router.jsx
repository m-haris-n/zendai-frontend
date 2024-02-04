import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";
import "./index.css";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ChatRedirector from "./Pages/Chat/ChatRedirector";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

const queryClient = new QueryClient();

const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "/chat",
      element: <ChatRedirector />,
   },
   {
      path: "/chat/:chatid",
      element: <Chat />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/register",
      element: <Register />,
   },
]);

export function Router() {
   return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />;
      </QueryClientProvider>
   );
}
