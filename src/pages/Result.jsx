import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search } from "../features/SearchSlice";
import {
  Text,
  VStack,
  Skeleton,
  Stack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";

function Result() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headlineColor = useColorModeValue("#d9376e", "#2cb67d");
  const { isLoading, results } = useSelector((state) => state.search);

  const trimmer = (s) => {
    return s.split(" ").join("+");
  };
  const handleClick = (e) => {
    let searchTerm = trimmer(e.target.innerText);
    dispatch(search(searchTerm));
    navigate("/search", {
      state: {
        q: searchTerm,
      },
    });
  };
 useEffect(() => {
  if(!isLoading && (results === {} || !results[0])){
    navigate("/")
  }

 }, []);

  if (isLoading) {
    return (
      <div className="max-w-lg mt-6 md:mt-10 ml-4 md:ml-16 md:mr-16">
        {/* <VStack mt={1} spacing={1} align="stretch" mb={5}>
                <Skeleton height="12px" width="80%" />
                <Skeleton height="12px" width="80%" />
                <Skeleton height="12px" width="80%" />
        </VStack> */}
        {[1, 2, 3, 4, 5, 6].map((k, index) => {
          return (
            <Box
              className=" pl-0"
              align="stretch"
              key={k + index}
            >
              <Skeleton height="20px" width="100%" />
              <Stack spacing={2} mt={1} isInline alignItems="center">
                <Skeleton height="8px" width="40%" />
              </Stack>
              <VStack mt={1} spacing={1} align="stretch">
                <Skeleton height="12px" width="80%" />
                <Skeleton height="12px" width="80%" />
                <Skeleton height="12px" width="80%" />
                <Skeleton height="12px" width="80%" />
              </VStack>
            </Box>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex justify-between flex-col md:flex-row-reverse mt-2 md:mt-10 ml-4 md:ml-16  md:mr-16">
      <div>
        {results.answers?.length > 0 && <h1 className="font-medium">popular questions</h1>}

        {results.answers?.map((answer, index) => {
          return (
            <Text
              fontSize="sm"
              onClick={handleClick}
              className="underline cursor-pointer"
              key={index*7/3}
            >
              {answer}
            </Text>
          );
        })}
      </div>
      <div>
        {results.results?.map(
          ({ additional_links, cite, description, link, title }, index) => {
            return (
              <div className="mt-4 mb-4 max-w-lg " key={index}>
                <a href={link} target="blank">
                  <Text
                    fontSize="lg"
                    className="font-bold "
                    color={headlineColor}
                  >
                    {title}
                  </Text>
                  <Text
                    fontSize="xx-small"
                    className="font-bold hover:underline hover:underline-offset-1 active:text-rose-700 "
                  >
                    {cite?.domain}
                  </Text>
                </a>
                <Text fontSize="xs" className="max-w-md font-sans font-medium">
                  {description}
                </Text>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default Result;
