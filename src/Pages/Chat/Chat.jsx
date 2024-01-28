import { useDisclosure } from "@mantine/hooks";
import {
   ActionIcon,
   AppShell,
   Avatar,
   Burger,
   Button,
   Flex,
   Group,
   Image,
   Loader,
   Modal,
   NavLink,
   Skeleton,
   Text,
   TextInput,
   Title,
} from "@mantine/core";
import ChatArea from "./components/ChatArea";
import ChatHistory from "./components/ChatHistory";
import { IconChevronDown, IconUser } from "@tabler/icons-react";
import { IconChevronCompactDown } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import AddCredentials from "./components/AddCredentials";
import { privIns } from "../../api/instances";
import { hasZenCreds, tries, user } from "../../Atoms";
import UserMenu from "./components/UserMenu";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function Dashboard() {
   // STATES

   const { chatid } = useParams();

   const queryClient = useQueryClient();

   const nav = useNavigate();

   const [opened, { toggle }] = useDisclosure(false);
   const [modalOpened, modalstate] = useDisclosure(false);
   const [zenCreds, setZenCreds] = useAtom(hasZenCreds);
   const [currUser, setCurrUser] = useAtom(user);
   const [userTries, setUserTries] = useAtom(tries);
   const [chatHist, setChatHist] = useState([]);

   // INIT CHECKERS

   // PRE-CHECKERS

   useEffect(() => {
      const uid = localStorage.getItem("userid");

      if (uid == null) {
         nav("/auth");
      }
   }, []);

   //Queries

   const userQuery = useQuery("curr_user", () => {
      privIns
         .get("/users/me")
         .then((res) => {
            const userdata = res.data;
            setCurrUser(userdata);
            // console.log(userdata.tries);
            if (userdata.apikey == null || userdata.subdomain == null) {
               modalstate.open();
               setZenCreds(false);
            } else {
               setUserTries(userdata.tries);
               setZenCreds(true);
            }
         })
         .catch((err) => {
            // console.log(err);
         });
   });

   const createChat = () => {
      privIns
         .post("/chats/")
         .then((res) => {
            // console.log(res);
         })
         .catch((err) => {
            // console.log(err);
         });
   };

   const chats = useQuery("chat", () => {
      privIns.get("/chats/").then((res) => {
         setChatHist(res.data);
      });
   });

   const chatMutation = useMutation(createChat, {
      onSuccess: () => {
         queryClient.invalidateQueries("chat");
      },
   });

   return (
      <>
         <AddCredentials
            modalOpened={modalOpened}
            modalstate={modalstate}
         />

         <AppShell
            header={{ height: 60 }}
            navbar={{
               width: 300,
               breakpoint: "sm",
               collapsed: { mobile: !opened },
            }}
            padding="md"
         >
            <AppShell.Header>
               <Flex
                  dir={"row"}
                  w={"100%"}
                  h="100%"
                  align={"center"}
                  justify={"space-between"}
                  px={"md"}
               >
                  <Group h="100%">
                     <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                     />
                     <Text
                        variant="gradient"
                        size={"30px"}
                        lh={1}
                        fw={700}
                        gradient={{ from: "purple", to: "blue" }}
                     >
                        ZendAI
                     </Text>
                  </Group>
                  <Flex
                     direction={"row"}
                     gap={16}
                     align={"center"}
                  >
                     <Button variant={"outline"}>
                        {userTries} Queries left
                     </Button>

                     <UserMenu openModal={modalstate.open} />
                  </Flex>
               </Flex>
            </AppShell.Header>
            <AppShell.Navbar p="md">
               <ChatHistory
                  history={chatHist}
                  createChat={chatMutation.mutate}
                  activeid={chatid}
               />
            </AppShell.Navbar>
            <AppShell.Main>
               <ChatArea
                  openCredsModal={modalstate.open}
                  chatid={chatid}
               />
            </AppShell.Main>
         </AppShell>
      </>
   );
}