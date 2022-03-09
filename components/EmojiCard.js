// import React from "react";
// import {
//   Text,
//   Button,
//   useColorModeValue,
//   Flex,
//   Spacer,
//   IconButton,
// } from "@chakra-ui/react";
// import { DeleteIcon } from "@chakra-ui/icons";

// export default function EmojiCard({ e, i, }) {
//   return (
//     <>
//       {i > 0}
//       <Flex
//         key={i}
//         w="100%"
//         align="center"
//         bg={useColorModeValue("gray.200", "gray.700")}
//         id="card"
//         p="4"
//         m="4"
//         boxShadow="lg"
//         borderRadius="lg"
//       >
//         <Text fontWeight="semibold">{e}</Text>
//         <Spacer />
//         <Text fontSize={{ base: "sm" }} maxW={"80%"}>
//           context
//         </Text>
//         <Spacer />
//         <IconButton onClick={() => deleteEmoji(e)} icon={<DeleteIcon />} />
//       </Flex>
//     </>
//   );
// }
