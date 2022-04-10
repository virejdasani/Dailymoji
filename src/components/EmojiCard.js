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
  emoji,
  i,
  deleteEmoji,
  id,
  sendContextData,
  emojiContext,
}) {
  const [input, setInput] = useState("");

  return (
    <>
      <Flex
        key={i}
        w="100%"
        align="center"
        bg={useColorModeValue("gray.200", "gray.700")}
        id="card"
        p="2"
        m="4"
        boxShadow="lg"
        borderRadius="28px"
      >
        <Text fontSize="6xl" m="4">
          {emoji}
        </Text>
        <Spacer />

        <Input
          id="emojiContextInput"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add context"
          // If there is not context set, then the input will be shown = ""
          value={input || emojiContext}
          maxW={"50%"}
        />
        <Button ml={2} onClick={() => sendContextData(input, id)}>
          Save
        </Button>

        {/* This is only for debugging */}
        {/* <Text fontSize={{ base: "sm" }} width="20%" textAlign="center">
          {context || "No Context"}
        </Text> */}

        <Spacer />
        <IconButton
          m="4"
          onClick={() => deleteEmoji(id)}
          icon={<DeleteIcon />}
        />
      </Flex>
    </>
  );
}
