import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { FilterComponents } from "../Components/FilterComponents";
import { fetchData } from "../Redux/products/action";

export const Products = () => {
  const products = useSelector((store) => store.ecommerceData.products);
  console.log("products", products);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (products?.length === 0) {
      let params = {
        category: searchParams.getAll("category"),
      };
      dispatch(fetchData(params));
    }
  }, [dispatch, products?.length, searchParams]);


  return (
    <Box>
      <Stack display={{ md: "flex" }} flexDirection={{ md: "row" }}>
        <Box border={"2px solid green"} minWidth = {"15rem"}>
          <FilterComponents />
        </Box>
        <Box border={"2px solid blue"}>
          <Heading>Products</Heading>
          <Flex flexWrap={"Wrap"} justifyContent={"space-around"}>
            {products.map((e) => {
              return (
            
                  <ProductSimple
                    key={e.id}
                    id={e.id}
                    image={e.image}
                    title={e.title}
                    price={e.price}
                  />
            
              );
            })}
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

function ProductSimple({ image, title, price,id }) {
 
 
  return (
    <Link to={`/products/${id}`}>
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"contain"}
              src={image}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            ></Text>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {title}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                `${price}`
              </Text>
              <Text textDecoration={"line-through"} color={"gray.600"}>
                $199
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </Link>
  );
}
