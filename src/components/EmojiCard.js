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
import moment from "moment";

export default function EmojiCard({
  emoji,
  deleteEmoji,
  id,
  sendContextData,
  emojiContext,
  timestamp,
}) {
  const [input, setInput] = useState("");

  return (
    <>
      <Flex
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

        <VStack width="100%">
          <Text width="85%" color="#CCCCCC" textAlign="left" fontSize="sm">
            {moment(timestamp).format("l") +
              " at " +
              moment(timestamp).format("LT")}
          </Text>

          <HStack width="85%">
            <Input
              id="emojiContextInput"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add context"
              // If there is not context set, then the input will be shown = ""
              value={input || emojiContext}
            />
            <Button ml={2} onClick={() => sendContextData(input, id)}>
              Save
            </Button>
          </HStack>
        </VStack>

        <IconButton
          m="4"
          onClick={() => deleteEmoji(id)}
          icon={<DeleteIcon />}
        />
      </Flex>
    </>
  );
}
