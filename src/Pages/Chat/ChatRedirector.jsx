import React, { useEffect } from "react";
import { privIns } from "../../api/instances";
import { useNavigate } from "react-router-dom";

export default function ChatRedirector() {
   const nav = useNavigate();

   useEffect(() => {
      privIns.get("/chats/").then((res) => {
         nav(`/chat/${res.data[0].id}`);
      });
   });
   return <div></div>;
}
