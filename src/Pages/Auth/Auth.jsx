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

export default function Auth(props) {
   const nav = useNavigate();
   const { state } = useLocation();
   const [type, setType] = useState(state != null ? state.auth_type : "login");

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const form = useForm({
      initialValues: {
         email: "",
         username: "",
         password: "",
         terms: true,
      },

      validate: {
         email: (val) =>
            type == "register"
               ? /^\S+@\S+$/.test(val)
                  ? null
                  : "Invalid email"
               : null,
         password: (val) =>
            val.length < 6
               ? "Password should include at least 6 characters"
               : null,
         username: (val) =>
            val.length < 6
               ? "Password should include at least 6 characters"
               : null,
         terms: (val) => (val ? null : "Must agree to terms and conditions."),
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
      if (type === "login") {
         setType(() => "register");
      } else {
         setType(() => "login");
      }
   };

   const handleAuth = (vals) => {
      // console.log("authing");
      setLoading(true);
      setError(false);
      if (type == "login") {
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
      } else {
         // console.log("register");
         const register = {
            username: vals.username,
            email: vals.email,
            password: vals.password,
         };
         // console.log(register);
         pubIns
            .post("/register", register)
            .then((res) => {
               setLoading(false);
               // console.log(res);
               // setType(() => "login");
               nav(0, { state: { auth_type: "login" } });
            })
            .catch((err) => {
               console.log(err.response.data.detail);
               setError(err.response.data.detail);
               setLoading(false);
               // console.log(err);
            });
      }
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
               Welcome to ZendAI, {type} with
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
                  {type === "register" && (
                     <TextInput
                        required
                        size={"lg"}
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps("email")}
                        radius="md"
                     />
                  )}

                  <PasswordInput
                     required
                     size={"lg"}
                     label="Password"
                     value={form.values.password}
                     {...form.getInputProps("password")}
                     radius="md"
                  />

                  {type === "register" && (
                     <Checkbox
                        size={"lg"}
                        label="I accept terms and conditions"
                        {...form.getInputProps("terms", { type: "checkbox" })}
                     />
                  )}
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
                     {type === "register"
                        ? "Already have an account? Login"
                        : "Don't have an account? Register"}
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
                        upperFirst(type)
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
