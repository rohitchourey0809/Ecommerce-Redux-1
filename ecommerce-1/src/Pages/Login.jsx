import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../Redux/LoginAuth/action";

export const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [userpassword, setpassword] = useState("");

  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("userEmail", userEmail, "password", userpassword);
    dispatch(signIn({ USEREMAIL: userEmail, PASSWORD: userpassword }));
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
      
        >
          <Stack spacing={4}>
            <form onSubmit={handleLoginSubmit}>
              <FormControl id="email" >
                <FormLabel>Email address</FormLabel>
                <Input
                  value={userEmail}
                  onChange={(e) => setuserEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" >
                <FormLabel>Password</FormLabel>
                <Input
                  value={userpassword}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
