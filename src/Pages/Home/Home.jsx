import React from "react";
import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
   const nav = useNavigate();

   return (
      <Container
         className={classes.wrapper}
         size={1400}
         h={"100vh"}
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <Dots
            className={classes.dots}
            style={{ left: 0, top: "40%" }}
         />
         <Dots
            className={classes.dots}
            style={{ left: 60, top: "40%" }}
         />
         <Dots
            className={classes.dots}
            style={{ left: 0, top: "60%" }}
         />
         <Dots
            className={classes.dots}
            style={{ right: 0, top: "50%" }}
         />

         <div className={classes.inner}>
            <Title className={classes.title}>
               Automated AI{" "}
               <Text
                  component="span"
                  className={classes.highlight}
                  inherit
               >
                  emails
               </Text>{" "}
               for your products and services.
            </Title>

            <Container
               p={0}
               size={600}
            >
               <Text
                  size="lg"
                  c="dimmed"
                  className={classes.description}
               >
                  Provide information about your business and generate cold
                  emails with just one click!
               </Text>
            </Container>

            <div className={classes.controls}>
               <Button
                  size={"lg"}
                  onClick={() =>
                     nav("/auth", { state: { auth_type: "register" } })
                  }
               >
                  Register
               </Button>
               <Button
                  size={"lg"}
                  variant={"white"}
                  onClick={() =>
                     nav("/auth", { state: { auth_type: "login" } })
                  }
               >
                  Login
               </Button>
            </div>
         </div>
      </Container>
   );
}
