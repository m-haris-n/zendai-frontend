import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
   TextInput,
   PasswordInput,
   Text,
   Paper,
   Group,
   Button,
   Divider,
   Checkbox,
   Anchor,
   Stack,
   Box,
   Flex,
   Loader,
   Alert,
} from "@mantine/core";
// import { GoogleButton } from "@/components/buttons/GoogleButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pubIns } from "../../api/instances";

export default function Login(props) {
   const nav = useNavigate();

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const form = useForm({
      initialValues: {
         username: "",
         password: "",
      },

      validate: {
         password: (val) =>
            val.length < 6
               ? "Password should include at least 6 characters"
               : null,
         username: (val) =>
            val.length < 6
               ? "Password should include at least 6 characters"
               : null,
      },
   });

   // PRE-CHECKERS

   useEffect(() => {
      const uid = localStorage.getItem("userid");

      if (uid != null) {
         nav("/chat");
      }
   }, []);

   //HANDLERS

   const toggle = () => {
      nav("/register");
   };

   const handleAuth = (vals) => {
      // console.log("authing");
      setLoading(true);
      setError(false);
      // console.log("login");
      const login = {
         username: vals.username,
         password: vals.password,
      };
      const loginStr = `username=${vals.username}&password=${vals.password}`;
      // console.log(loginStr);
      pubIns
         .post("/token", loginStr)
         .then((res) => {
            setLoading(false);
            const data = res.data;
            // console.log(data);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("userid", data.user.id);
            localStorage.setItem("username", data.user.username);
            nav("/chat");
         })
         .catch((err) => {
            // console.log(err);
            setError(err.response.data.detail);

            setLoading(false);
         });
   };

   return (
      <Flex
         pt={80}
         justify={"center"}
      >
         <Paper
            radius="md"
            p="xl"
            maw={600}
            w={500}
            withBorder
            {...props}
         >
            <Text
               lh={1}
               size={"28px"}
               fw={500}
            >
               Welcome to ZendAI, Login with
            </Text>

            <form
               onSubmit={form.onSubmit((vals) => {
                  // console.log(vals);
                  handleAuth(vals);
               })}
            >
               <Stack>
                  <TextInput
                     required
                     size={"lg"}
                     label="Username"
                     radius="md"
                     {...form.getInputProps("username")}
                  />

                  <PasswordInput
                     required
                     size={"lg"}
                     label="Password"
                     value={form.values.password}
                     {...form.getInputProps("password")}
                     radius="md"
                  />
               </Stack>

               <Group
                  justify="space-between"
                  mt="xl"
               >
                  <Anchor
                     component="button"
                     type="button"
                     c="dimmed"
                     onClick={() => toggle()}
                     size="s"
                  >
                     "Don't have an account? Register"
                  </Anchor>
                  <Button
                     size={"lg"}
                     type="submit"
                     radius="xl"
                     w={150}
                  >
                     {loading ? (
                        <Loader
                           color={"white"}
                           size={"sm"}
                        />
                     ) : (
                        "Login"
                     )}
                  </Button>
               </Group>
            </form>
            {error && (
               <Alert
                  my={16}
                  color={"red"}
                  radius={"md"}
               >
                  {error}
               </Alert>
            )}
         </Paper>
      </Flex>
   );
}
