import React from "react";
import {
  Stack,
  Text,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Card() {
  return (
    <Stack
      bg={useColorModeValue("gray.200", "gray.800")}
      id="card"
      p="4"
      boxShadow="lg"
      m="4"
      borderRadius="lg"
    >
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">Emoji</Text>
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          Context
        </Text>
        <Stack direction={{ base: "column", md: "row" }}>
          <IconButton
            // onClick={() => deleteEmoji(t)}
            icon={<DeleteIcon />}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
