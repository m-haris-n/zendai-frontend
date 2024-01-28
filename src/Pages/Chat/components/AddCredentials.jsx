import { Button, Loader, Modal, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { privIns } from "../../../api/instances";

export default function AddCredentials({ modalOpened, modalstate }) {
   //STATES

   const [addCredLoad, setAddCredLoad] = useState(false);
   const [addCredErr, setAddCredErr] = useState(false);

   const credsForm = useForm({
      initialValues: {
         apikey: "",
         subdomain: "",
      },
      validate: {
         apikey: (val) => (val.length == 0 ? "Please enter API key" : null),
         subdomain: (val) =>
            val.length == 0 ? "Please enter Subdomain" : null,
      },
   });

   // Request Handlers

   const addCredsToUser = (vals) => {
      setAddCredErr(false);
      setAddCredLoad(true);
      privIns
         .patch("/users/me", vals)
         .then((res) => {
            // console.log(res);
            setAddCredLoad(false);
         })
         .catch((err) => {
            // console.log(err);
            setAddCredLoad(false);
            setAddCredErr(true);
         });
   };

   return (
      <Modal
         opened={modalOpened}
         withCloseButton={false}
         radius={"md"}
         onClose={modalstate.close}
      >
         <Modal.Header>
            <Title order={3}>Add your Zendesk credentials</Title>
         </Modal.Header>
         <Modal.Body>
            <form
               onSubmit={credsForm.onSubmit((vals) => {
                  addCredsToUser(vals);
               })}
            >
               <Text>
                  You can't proceed without adding your Zendesk Credentials!
               </Text>
               <TextInput
                  label={"Zendesk Subdomain"}
                  my={"sm"}
                  withAsterisk
                  {...credsForm.getInputProps("subdomain")}
               />
               <TextInput
                  label={"Zendesk API Key"}
                  my={"sm"}
                  withAsterisk
                  {...credsForm.getInputProps("apikey")}
               />
               <Button
                  fullWidth={true}
                  my={"md"}
                  type={"submit"}
               >
                  {addCredLoad === true ? (
                     <Loader
                        size={"sm"}
                        color={"white"}
                     />
                  ) : (
                     "Save"
                  )}
               </Button>
            </form>
         </Modal.Body>
      </Modal>
   );
}
