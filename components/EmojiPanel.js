import React from "react";
import {
  Stack,
  HStack,
  Box,
  Text,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function EmojiPanel() {
  const availableEmoji1 = ["🎮", "🥘", "💪", "🏐", "📚", "🚗"];

  const availableEmoji2 = ["🎸", "📕", "💼", "🎬"];

  return (
    <Box
      padding={2}
      bg={useColorModeValue("gray.200", "#1A2232")}
      borderColor={useColorModeValue("gray.300", "#263553")}
      borderWidth="1px"
      borderRadius="xl"
    >
      <HStack spacing="10px">
        {availableEmoji1.map((emoji) => (
          <Button variant="ghost" borderRadius={16} width="64px" height="64px">
            <Text fontSize="5xl">{emoji}</Text>
          </Button>
        ))}
        {/* <Button variant="ghost" borderRadius={16} width="64px" height="64px">
          <Text fontSize="3xl">+</Text>
        </Button> */}
        {/* <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>1</Tab>
            <Tab>2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs> */}
      </HStack>
    </Box>
  );
}
