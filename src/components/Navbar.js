import {
  Flex,
  Heading,
  Box,
  Button,
  Text,
  IconButton,
  Stack,
  Menu,
  Avatar,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ExternalLinkIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import DarkModeSwitch from "../components/DarkModeSwitch";

function Navbar({ username, auth, user, logout, singInWithGoogle }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      id="navbar"
      position="fixed"
      bg={useColorModeValue("gray.100", "gray.800")}
      px={4}
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      w="100%"
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontFamily="'Fredoka One', cursive" fontSize="3xl">
          dailymoji
        </Box>

        {/* <Heading id="welcomeText">{username}</Heading> */}
        {/* Welcome back, Virej Dasani (👆) */}

        <Flex alignItems={"center"}>
          <Menu>
            <Flex justify="space-between" w="100%" align="center">
              <Flex>
                <DarkModeSwitch />
                <IconButton
                  ml={2}
                  onClick={onOpen}
                  icon={<QuestionOutlineIcon />}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      Dailymoji is developed by{" "}
                      <Link href="https://virejdasani.github.io/">
                        Virej Dasani
                      </Link>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      Check it out on GitHub{" "}
                      <Link href="https://github.com/virejdasani/Dailymoji">
                        here
                      </Link>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                {/* {auth.currentUser && auth.currentUser.displayName ? (
                  <>
                    <IconButton
                      ml={2}
                      onClick={logout}
                      icon={<ExternalLinkIcon />}
                    />
                  </>
                ) : (
                  ""
                )} */}
              </Flex>
            </Flex>

            <Flex alignItems={"center"} ml={3}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      auth.currentUser && auth.currentUser.photoURL
                        ? auth.currentUser.photoURL
                        : ""
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={
                      auth.currentUser && auth.currentUser.displayName
                        ? logout
                        : singInWithGoogle
                    }
                    color="inherit"
                  >
                    {auth.currentUser && auth.currentUser.displayName ? (
                      <p>Logout</p>
                    ) : (
                      <p>Login with Google</p>
                    )}
                  </MenuItem>
                  {/* <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem> */}
                </MenuList>
              </Menu>
            </Flex>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
