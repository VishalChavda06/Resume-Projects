import React from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

const ChakraUI = () => {
  return (
    <>
      <div style={{ padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "8px" , margin: '20px', textAlign: 'center' }}>
        <h1>Chakra UI Example</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button
              variant="outline"
              size="sm"
              style={{ backgroundColor: "black" }}
            >
              Open Dialog
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content style={{backgroundColor: 'white', borderRadius: '8px', padding: '20px'}}>
                <Dialog.Header>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button>Save</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </div>
    </>
  );
};

export default ChakraUI;
