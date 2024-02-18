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
               Ask, Analyze, Achieve with{" "}
               <Text
                  span
                  inherit
                  variant="gradient"
                  gradient={{ from: "purple", to: "blue" }}
                  fw={700}
               >
                  Supportive
               </Text>
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
                  Stop wrangling with Zendesk Explore to get basic data, just
                  type what you need and let Supportive do the work.
               </Text>
            </Container>

            <div className={classes.controls}>
               <Button
                  size={"lg"}
                  onClick={() => nav("/register")}
               >
                  Register
               </Button>
               <Button
                  size={"lg"}
                  variant={"white"}
                  onClick={() => nav("/login")}
               >
                  Login
               </Button>
            </div>
         </div>
      </Container>
   );
}
