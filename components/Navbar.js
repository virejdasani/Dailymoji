// from: https://codesandbox.io/s/nextjs-chakra-navbar-rn63x (components/GenericNavbar)
// hamburger menu removed for now

import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import DarkModeSwitch from "./DarkModeSwitch";

export default function withAction(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button variant={"solid"} colorScheme={"teal"} size={"sm"}>
            Dailymoji
          </Button>
          <Heading id="welcomeText">{props.heading}</Heading>
          <Flex alignItems={"center"}>
            <Menu>
              <Flex justify="space-between" w="100%" align="center">
                <Flex>
                  <DarkModeSwitch />
                  {/* TODO: change this icon to something other than a star */}
                  <IconButton
                    ml={2}
                    // TODO :
                    // onClick={AuthUser.signOut}
                    icon={<StarIcon />}
                  />
                </Flex>
              </Flex>
              <Avatar
                ml={2}
                size={"sm"}
                src={
                  // get user image from firebase
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
