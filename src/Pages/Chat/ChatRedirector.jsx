import React, { useEffect } from "react";
import { privIns } from "../../api/instances";
import { useNavigate } from "react-router-dom";

export default function ChatRedirector() {
   const nav = useNavigate();

   useEffect(() => {
      privIns
         .get("/chats/")
         .then((res) => {
            if (res.data.length == 0) {
               privIns.post("/chats").then((res) => {
                  nav(`/chat/${res.data.id}`);
               });
            }
            nav(`/chat/${res.data[0].id}`);
         })
         .catch((err) => {
            localStorage.clear();
            nav("/auth");
         });
   }, []);
   return <div></div>;
}
