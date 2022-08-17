import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteProductCard } from "../Redux/products/action";

export const Checkout = ({ card, checkOutHandler }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const removeProduct = (id) => {
    console.log(`going to remove Proudvtcv`, id);
    dispatch(deleteProductCard(id));
  };
  // const deleteItem = (payload) => {
  //   dispatch(emptyCart(payload));
  // };
  return (
    <Box>
      <Button
        rounded={"none"}
        w={"full"}
        mt={8}
        size={"lg"}
        py={"7"}
        colorScheme={"golden"}
        bg={useColorModeValue("gray.900", "gray.50")}
        onClick={onOpen}
        textTransform={"uppercase"}
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
      >
        Check Out
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm PurChase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {card.map((e) => {
              return (
                <Box key={e.id}>
                  <Flex>
                    <Box>
                      <Image
                        border={"1px solid black"}
                        rounded={"lg"}
                        src={e.image}
                        // objectFit={"contain"}
                        alt="product image"
                        boxSize={"100px"}
                      />
                    </Box>

                    <Box maxWidth={"250px"} ml="1rem">
                      <Text fontSize={"lg"}>{e.title}</Text>
                    </Box>
                    <Box maxWidth={"250px"} ml="1rem">
                      <Text fontSize={"lg"}>
                        <Button onClick={() => removeProduct(e.id)}>
                          Remove Item
                        </Button>
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={checkOutHandler}>
              ConFirm
            </Button>
            {/* <Button variant="ghost">ConFirm</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
