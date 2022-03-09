import React from "react";
import {
  Text,
  Button,
  useColorModeValue,
  Flex,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function EmojiCard({ t, i, deleteEmoji, timeID }) {
  return (
    <>
      {i > 0}
      <Flex
        key={i}
        w="100%"
        align="center"
        bg={useColorModeValue("gray.200", "gray.700")}
        id="card"
        p="4"
        m="4"
        boxShadow="lg"
        borderRadius="lg"
      >
        <Text fontWeight="semibold">{t}</Text>
        <Spacer />
        <Text fontSize={{ base: "sm" }} maxW={"80%"}>
          {/* <InputGroup mt={8}>
            <InputLeftElement
              pointerEvents="none"
              children={<AddIcon color="gray.300" />}
            />
            <Input
              id="emojiInput"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add emoji"
            />

            <Button ml={2} onClick={() => sendData()}>
              Add Emoji
            </Button>
          </InputGroup> */}
        </Text>
        <Spacer />
        <IconButton onClick={() => deleteEmoji(timeID)} icon={<DeleteIcon />} />
      </Flex>
    </>
  );
}
