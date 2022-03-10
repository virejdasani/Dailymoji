import React, { useState } from "react";
import {
  Text,
  Button,
  useColorModeValue,
  Flex,
  Spacer,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function EmojiCard({
  t,
  i,
  deleteEmoji,
  timeID,
  sendData,
  sendContextData,
  context,
}) {
  const [input, setInput] = useState("");

  return (
    <>
      {i > 0}
      <Flex
        key={i}
        w="100%"
        align="center"
        bg={useColorModeValue("gray.200", "gray.700")}
        id="card"
        // p="4"
        m="4"
        boxShadow="lg"
        borderRadius="lg"
      >
        <Text fontSize="6xl" m="4">
          {t}
        </Text>
        <Spacer />

        <Input
          id="emojiContextInput"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add context"
          // If there is not context set, then the input should be shown
          value={context || input}
          maxW={"50%"}
        />
        <Button ml={2} onClick={() => sendContextData(input, timeID)}>
          Save
        </Button>

        {/* This is only for debugging */}
        {/* <Text fontSize={{ base: "sm" }} width="20%" textAlign="center">
          {context || "No Context"}
        </Text> */}

        <Spacer />
        <IconButton
          m="4"
          onClick={() => deleteEmoji(timeID)}
          icon={<DeleteIcon />}
        />
      </Flex>
    </>
  );
}
