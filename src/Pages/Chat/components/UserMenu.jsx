import { Avatar, Button, Menu, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { useAtom } from "jotai";
import { user } from "../../../Atoms";
import { useNavigate } from "react-router-dom";

export default function UserMenu({ openModal }) {
   //States

   const nav = useNavigate();
   const [currUser, setCurrUser] = useAtom(user);

   //Handlers

   const logoutHandler = () => {
      localStorage.clear();
      nav("/login");
   };

   return (
      <div>
         <Menu position={"bottom-end"}>
            <Menu.Target>
               <Button
                  className={"hover:bg-slate-100"}
                  variant={"transparent"}
                  rightSection={<IconChevronDown size={18} />}
               >
                  {currUser.username}
               </Button>
               {/* <Avatar
                  src={null}
                  size={"sm"}
               />
               <Text >UserName</Text>
               <IconChevronDown size={18} /> */}
            </Menu.Target>
            <Menu.Dropdown>
               <Menu.Item onClick={openModal}>Change Credentials</Menu.Item>
               <Menu.Item onClick={logoutHandler}>Log out</Menu.Item>
            </Menu.Dropdown>
         </Menu>
      </div>
   );
}
