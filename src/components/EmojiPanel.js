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

export default function EmojiPanel({ sendEmojiData }) {
  const availableEmoji1 = ["🎮", "🥘", "💪", "🏐", "📚", "🚗"];
  const availableEmoji2 = ["🎸", "📕", "💼", "🎬", "⚽", "🎨"];

  return (
    <Box
      // padding={2}
      bg={useColorModeValue("#E2E8F0bb", "#1A2239bb")}
      borderColor={useColorModeValue("gray.300", "#263553")}
      borderWidth="1px"
      borderRadius="xl"
      mx="auto"
    >
      <Tabs variant="">
        <TabPanels>
          <TabPanel>
            {availableEmoji1.map((emoji, index) => (
              <Button
                variant="ghost"
                borderRadius={16}
                width={["24px", "64px"]}
                height={["24px", "64px"]}
                onClick={() => {
                  sendEmojiData(emoji);
                }}
                key={index}
                py={["2", "3", "4", "5"]}
              >
                <Text fontSize={["4xl", "5xl"]}>{emoji}</Text>
              </Button>
            ))}
          </TabPanel>
          <TabPanel>
            {availableEmoji2.map((emoji, index) => (
              <Button
                variant="ghost"
                borderRadius={16}
                width="64px"
                height="64px"
                onClick={() => {
                  sendEmojiData(emoji);
                }}
                key={index}
              >
                <Text fontSize="1xl">{emoji}</Text>
              </Button>
            ))}
          </TabPanel>
        </TabPanels>
        <TabList
          textAlign="center"
          justifyContent="center"
          margin={0}
          padding="0"
        >
          <Tab
            margin="2"
            height={8}
            width={8}
            padding="1"
            textColor={useColorModeValue("#a0a0a0", "#C0C0C0")}
          >
            1
          </Tab>
          <Tab
            margin="2"
            height={8}
            width={8}
            padding="1"
            textColor={useColorModeValue("#a0a0a0", "#C0C0C0")}
          >
            2
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
