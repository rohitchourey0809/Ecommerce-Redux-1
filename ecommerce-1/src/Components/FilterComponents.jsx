import {
  Box,
  // Button,
  Checkbox,
  CheckboxGroup,
  // Menu,
  // MenuButton,
  // MenuDivider,
  // MenuItemOption,
  // MenuList,
  // MenuOptionGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../Redux/products/action";

export const FilterComponents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  console.log(searchParams.getAll("category"));
  const [categoryvalue, setcategoryvalue] = useState(
    searchParams.getAll("category") || []
    // const {params} = useSearchParams();
  );

  const categoryHandler = (values) => {
    console.log("value", values);
    setcategoryvalue(values);
  };

  useEffect(() => {
    console.log("categoryValue", categoryvalue);
    if (categoryvalue) {
      var k = setSearchParams({ category: categoryvalue });
      console.log("category", k);

      let params = {
        category: searchParams.getAll("category"),
      };
      console.log("parasm", params.category);
      var z = dispatch(fetchData(params));
      console.log("z", z);
    }
  }, [categoryvalue, dispatch, searchParams, setSearchParams]);
  return (
    <>
      <Box>
        <Box>
          <Text fontSize="2xl">Filters</Text>
          <Text>Categeory</Text>
          <CheckboxGroup
            colorScheme="green"
            defaultValue={categoryvalue}
            onChange={categoryHandler}
          >
            <Stack alignItems={"baseline"}>
              <Checkbox value="men's clothing">men's clothing</Checkbox>
              <Checkbox value="women's clothing">women's clothing</Checkbox>

              <Checkbox value="jewelery">jewelery</Checkbox>
              <Checkbox value="electronics"> electronics</Checkbox>
              <Checkbox value="bags"> Bags</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
      </Box>
    </>
  );
};
