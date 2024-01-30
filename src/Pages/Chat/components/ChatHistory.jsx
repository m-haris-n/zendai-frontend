import {
   Anchor,
   Box,
   Button,
   Flex,
   Loader,
   NavLink,
   Paper,
   ScrollArea,
   Text,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChatHistory({
   history,
   createChat,
   activeid,
   loading,
}) {
   const nav = useNavigate();
   console.log("loading", loading);

   const navlinks = history.map((chat) => (
      <NavLink
         key={chat.id}
         label={chat.chatname != null ? chat.chatname : chat.created_at}
         variant={"light"}
         className={"rounded-md"}
         active={chat.id == activeid}
         onClick={() => nav(`/chat/${chat.id}`)}
      />
   ));

   return (
      <ScrollArea
         mah={"calc(100vh)"}
         scrollbarSize={5}
      >
         <Flex
            h={"100%"}
            w={"100%"}
            direction={"column"}
            justify={"space-between"}
            align={"start"}
            gap={16}
            pr={16}
         >
            <Button
               onClick={() => {
                  createChat();
               }}
            >
               {loading == true ? (
                  <Loader
                     size={"sm"}
                     color={"white"}
                  />
               ) : (
                  "Create new chat"
               )}
            </Button>

            {navlinks}
         </Flex>
      </ScrollArea>
   );
}
