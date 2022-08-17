import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../Redux/products/action";
export const CartCounter = () => {
  const card = useSelector((state) => state.ecommerceData.card);

  const dispatch = useDispatch();
  console.log("Cart Counter", card);

  useEffect(() => {
    if (card?.length === 0) dispatch(fetchCart());
  }, [card?.length, dispatch]);
  return (
    <Box
      backgroundColor="black"
      textColor={"white"}
      borderRadius="50%"
      width="20px"
      height="20px"
      textAlign="center"
      paddinBottom="20px"
      position="absolute"
      right="0"
      top="0"
    >
      {card?.length ? card.length : 0}
    </Box>
  );
};
