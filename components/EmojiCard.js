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
  VStack,
  HStack,
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
  timestamp,
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
        <Text
          fontSize="7xl"
          marginTop={2}
          marginBottom={2}
          marginLeft={4}
          marginRight={6}
        >
          {t}
        </Text>

        <VStack spacing={3} w="55%">
          <Text
            textAlign="left"
            fontWeight="bold"
            w="100%"
            color={useColorModeValue("#7A7A7A", "#BCBCBC")}
          >
            {/* This shows the date in this format: Thu Mar 10 2022, 10:14 AM */}
            {new Date(timestamp * 1000).toDateString()}
            {", "}
            {new Date(timestamp * 1000).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>

          <HStack spacing={2} w="100%">
            <Input
              id="emojiContextInput"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add context"
              // If there is not context set, then the input should be shown
              value={context || input}
            />
            <Button ml={2} onClick={() => sendContextData(input, timeID)}>
              {/* TODO: change save to a tick symbol */}
              Save
            </Button>
          </HStack>
        </VStack>

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
