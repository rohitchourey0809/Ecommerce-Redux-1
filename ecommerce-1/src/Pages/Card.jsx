import React from "react";
import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AddOrder, deleteProductCard } from "../Redux/products/action";
import { Checkout } from "../Components/Checkout";

export const Card = () => {
  const card = useSelector((state) => state.ecommerceData.card);
  console.log("Card----", card);
  const dispatch = useDispatch();

  const removeProduct = (id) => {
    console.log(`going to remove Prouduct ID`, id);
    dispatch(deleteProductCard(id));
  };

  const checkOutHandler = () => {
    dispatch(AddOrder(card));
  };
  return (
    <Box>
      <>
        <Heading as="h2" size="xl" textAlign="center">
          Cart
        </Heading>
        {card.length &&
          card.map((e) => {
            return (
              <CartItem
                key={e.id}
                id={e.id}
                title={e.title}
                price={e.price}
                image={e.image}
                description={e.description}
                removeProduct={removeProduct}
              />
            );
          })}
      </>
      <Checkout card={card} checkOutHandler={checkOutHandler} />
    </Box>
  );
};

function CartItem({ id, title, image, description, price, removeProduct }) {
  return (
    <Box
      border={"1px solid red"}
      rounded={"lg"}
      width={"fit-content"}
      margin={"auto"}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box height={"500"} width={"500px"}>
          <Image
            alignItems={"center"}
            rounded={"lg"}
            height={400}
            width={200}
            objectFit={"fit"}
            src={image}
            overflow={"hidden"}
          />
        </Box>
        <Box height={"200px"} width={"300px"}>
          <Text fontSize={"20px"}>{title}</Text>
          <Text textOverflow={"ellipsis"} fontSize={"10px"} padding={"10px"}>
            {description} whitespace = {"nowrap"}
          </Text>
          <Text overflow={"hidden"} fontSize={"10px"}>
            Price:`${price}`
          </Text>
          <Button
            onClick={() => removeProduct(id)}
            variant={"outline"}
            leftIcon={<DeleteIcon />}
          >
            Remove
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
