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
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
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
        m="4"
        boxShadow="lg"
        borderRadius="28px"
        px={2}
      >
        <Text fontSize="6xl" m="4">
          {emoji}
        </Text>

        <VStack width="100%">
          <Text
            width="95%"
            color={useColorModeValue("gray.700", "gray.200")}
            textAlign="left"
            fontSize={["xs", "sm", "md"]}
            fontFamily="'Work Sans', sans-serif"
            fontWeight="normal"
          >
            {moment(timestamp).format("l") +
              " at " +
              moment(timestamp).format("LT")}
          </Text>

          <HStack width="95%">
            {/* TODO: sendContextData when enter is pressed like in a form */}
            <Input
              id="emojiContextInput"
              type="text"
              fontFamily="'Work Sans', sans-serif"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add context"
              // If there is not context set, then the input will be shown = ""
              value={input || emojiContext}
              border="none"
              autoComplete="off"
              variant="flushed"
              fontSize="lg"
              fontWeight="normal"
            />
            {/* when user start typing context, then the checkbox appears */}
            {input ? (
              <IconButton
                m="4"
                onClick={() => sendContextData(input, id)}
                colorScheme="blue"
                variant="ghost"
                icon={<CheckIcon />}
                ml={2}
              />
            ) : (
              ""
            )}
          </HStack>
        </VStack>

        <IconButton
          m="4"
          onClick={() => deleteEmoji(id)}
          colorScheme="red"
          variant="ghost"
          size="lg"
          icon={<DeleteIcon />}
        />
      </Flex>
    </>
  );
}
