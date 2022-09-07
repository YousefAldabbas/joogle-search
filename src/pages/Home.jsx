import React, { useState,  } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

import { search } from "../features/SearchSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [disable, setdisable] = useState(false);
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

  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen flex-col gap-10 pb-28"


    >
      <h1 className="divide-neutral-900 font-bold text-7xl md:text-8xl"

style={{
  fontFamily: "Bangers, cursive"
}}
      >
        <span
          className="md:text-9xl pr-2 md:pr-3"
          style={{
            background:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4_JrSf_pauR0hyBmjV3YrdMQ9GT-rgVZPw&usqp=CAU) ",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          JO
        </span>
        OGLE
      </h1>

      <form onSubmit={onSubmit} className="md:w-[700px]">
        <InputGroup className="md:max-w-[700px]">
          <InputLeftElement
            pointerEvents="none"
            fontSize="1.6em"
            height="100%"
            children={<AiOutlineSearch />}
          />
          <Input
            type="tel"
            placeholder="Search ..."
            size="lg"
            className=" max-w-full"
            width="full"
            onChange={(e) => setSearchInput(e.target.value)}
            disable={disable.toString()}
          />
        </InputGroup>
      </form>
    </div>
  );
}

export default Home;
