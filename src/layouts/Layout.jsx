import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  VStack,
  chakra,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useScroll } from "framer-motion";
import { FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { AiFillGithub, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

import {
  Outlet,
  Link as ReachLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { search, reset } from "../features/SearchSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [disable, setdisable] = useState(false);
  const mobileNav = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSearchInput(state?.q.split("+").join(" "));
  }, [state]);
  const { isLoading } = useSelector((state) => state.search);
  const bg = useColorModeValue("#eff0f3", "#16161a");
  const ref = React.useRef(null);
  const [y, setY] = React.useState(0);
  const height = ref.current ? ref.current.getBoundingClientRect() : 0;

  const { scrollY } = useScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const trimmer = (s) => {
    return s.split(" ").join("+");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setdisable(true);
    let searchTerm = trimmer(searchInput);
    dispatch(search(searchTerm));
    navigate("/search", {
      state: {
        q: searchTerm,
      },
    });
  };

  const SponsorButton = (
    <Box
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      as="a"
      href={""}
      target="_blank"
      rel="noopener noreferrer"
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
      px="1em"
      minH="36px"
      rounded="md"
      fontSize="sm"
      color="gray.800"
      outline="0"
      transition="all 0.3s"
      _hover={{
        bg: "gray.100",
        borderColor: "gray.300",
      }}
      _active={{
        borderColor: "gray.200",
      }}
      _focus={{
        boxShadow: "outline",
      }}
      ml={5}
    >
      <Icon as={FaHeart} w="4" h="4" color="red.500" mr="2" />
      <Box as="strong" lineHeight="inherit" fontWeight="semibold">
        Sponsor
      </Box>
    </Box>
  );
  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      zIndex="2"
      w="100%"
      ml="0"
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <HStack spacing="5" display={{ base: "none", md: "flex" }}>
        <Link
          isExternal
          aria-label="Go to my  GitHub page"
          href="https://github.com/YousefAldabbas"
        >
          <Icon
            as={AiFillGithub}
            display="block"
            transition="color 0.2s"
            w="5"
            h="5"
            _hover={{ color: "gray.600" }}
          />
        </Link>
      </HStack>
      <Button w="full" variant="solid" leftIcon={<AiFillGithub />}>
        <Link
          isExternal
          aria-label="Go to my GitHub page"
          href="https://github.com/YousefAldabbas"
        >
          Github
        </Link>
      </Button>
      <Button w="full" variant="ghost" leftIcon={<FaHeart />}>
        Sponsor
      </Button>
    </VStack>
  );
  return (
    <Box
      pos="relative"
      style={{
        maxWidth: "100vw",
        maxHeight: isLoading ? "100vh" : "100%",
        overflow: pathname === "/" || isLoading ? "hidden" : "",
      }}
      bg={bg}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#2a2a2a",
          display: isLoading ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
          opacity: "0.4",
        }}
      >
        <Spinner size="xl" className="" color={"red"} />
      </div>
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px" className=" p-2 md:p-0">
          <Flex w="full" h="full" px="0" align="center" justify="space-between">
            <Box className="min-w-[100px]">
              <Flex align="center">
                <Link
                  as={ReachLink}
                  to=""
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <h1
                    className="divide-neutral-900 font-bold text-2xl "
                    style={{
                      fontFamily: "Bangers, cursive",
                    }}
                  >
                    <span
                      className="text-5xl"
                      style={{
                        background:
                          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4_JrSf_pauR0hyBmjV3YrdMQ9GT-rgVZPw&usqp=CAU) ",
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        paddingRight: "4px",
                      }}
                    >
                      JO
                    </span>
                    OGLE
                  </h1>
                </Link>
              </Flex>
            </Box>
            {pathname !== "/" && (
              <Box align="flex-end">
                <form onSubmit={onSubmit}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <AiOutlineSearch />
                    </InputLeftElement>
                    <Input
                      type="tel"
                      placeholder="Search ..."
                      value={searchInput != null ? searchInput : ""}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                      }}
                      disable={disable.toString()}
                    />
                  </InputGroup>
                </form>
              </Box>
            )}

            <Box>
              <Flex
                justify="flex-end"
                w="full"
                maxW="824px"
                align="center"
                color="gray.400"
              >
                <HStack spacing="5" display={{ base: "none", md: "flex" }}>
                  <Link
                    isExternal
                    aria-label="Go to my GitHub page"
                    href="https://github.com/YousefAldabbas"
                  >
                    <Icon
                      as={AiFillGithub}
                      display="block"
                      transition="color 0.2s"
                      w="5"
                      h="5"
                      _hover={{ color: "gray.600" }}
                    />
                  </Link>
                </HStack>
                <IconButton
                  size="md"
                  fontSize="lg"
                  aria-label={`Switch to ${text} mode`}
                  variant="ghost"
                  color="current"
                  ml={{ base: "0", md: "3" }}
                  onClick={toggleMode}
                  icon={<SwitchIcon />}
                />
                {SponsorButton}
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{ color: "inherit" }}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />
              </Flex>
            </Box>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
    </Box>
  );
}
