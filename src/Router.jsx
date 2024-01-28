import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";
import Auth from "./Pages/Auth/Auth";
import "./index.css";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ChatRedirector from "./Pages/Chat/ChatRedirector";

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
      path: "/auth",
      element: <Auth />,
   },
]);

export function Router() {
   return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />;
      </QueryClientProvider>
   );
}
