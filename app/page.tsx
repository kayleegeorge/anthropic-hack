"use client";
import React, { useState } from "react";
import { sendToAnthropic } from "./api/anthropic";
import { PaperPlaneRight } from "@phosphor-icons/react";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  StackDivider,
  VStack,
  Text,
} from "@chakra-ui/layout";
import Header from "./components/header";
import Rule from "./components/rule";
import { Input } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import GameModeInstructions from "./components/gamemodeinstructions";
import { generate, count } from "random-words";
import { jetbrains } from "./_app";
import { useChat } from "ai/react";
import { m } from "framer-motion";

export type GameMode = "Game" | "Playground";

export type Message = {
  id: string;
  content: string;
  role: "system" | "user" | "assistant";
};

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/v2",
  });

  const [mode, setMode] = useState<GameMode>("Playground");
  const secret = generate({ minLength: 4, maxLength: 12 });
  const [messagesV1, setMessages] = useState<Message[]>([]);

  // rules
  const [rule, setRule] = useState<string>("");
  const [rules, setRules] = useState<string[]>([]);
  const [rulesList, setRulesList] = useState<any[]>([]);

  // handle adding a rule
  const handleAddRule = (event: any) => {
    rules.push(rule);
    setRules(rules);
    rulesList.push(<Rule rule={rule} />);
    setRulesList(rulesList);
  };

  const handleMode = (event: any) => {
    if (mode == "Game") setMode("Playground");
    else setMode("Game");
  };

  const handleClick = async () => {
    const m: Message = {
      id: prompt,
      content: prompt,
      role: "user",
    };
    messagesV1.push(m);
    setPrompt("");
    const response = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify({
        userInput: prompt,
        rules: rules,
      }),
    });
    let data = await response.json();
    setMessages(messagesV1.concat(data.completion));
  };
  const [prompt, setPrompt] = useState("");
  const handlePromptInput = (event: any) => setPrompt(event.target.value);

  return (
    <Flex
      padding={"25px"}
      width={"100%"}
      height="100vh"
      flexDirection={"column"}
      fontFamily={jetbrains.style.fontFamily}
      textColor={"white"}
    >
      <Header />
      <Container height="40px"></Container>
      <Flex>
        <Flex flexDirection={"column"} width="250px">
          <GameModeInstructions gameMode={mode} />
          <Button
            onClick={handleMode}
            fontSize={12}
            colorScheme="red"
            variant="link"
            marginBottom={"20px"}
          >
            {mode == "Game" ? `Enter Playground Mode` : `Switch to Game Mode`}
          </Button>

          <Button size="sm" colorScheme="red">
            Why Red Team?
          </Button>
        </Flex>
        {/* <Flex flexDirection={'column'} width={'400px'}>
        Your Rules
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch'
        >
          {rulesList}
        </VStack>
      </Flex> */}

        <Flex flexDirection={"column"} width={"700px"} margin={"auto"}>
          <Text marginBottom={"8px"}>Break Claude</Text>
          <Flex
            width={"100%"}
            flexDirection={"column"}
            paddingRight={"40px"}
            align={"center"}
          >
            <Flex
              padding="16px"
              flexDirection="column"
              borderTopRadius={6}
              width={"100%"}
              height="300px"
              backgroundColor={"#cc785c"}
              gap="10px"
              borderBottom={"1px"}
              borderBottomColor={"#454654"}
            >
              {messagesV1.map((m) => (
                <div key={m.id}>
                  {m.role === "user" ? "User: " : "AI: "}
                  {m.content}
                </div>
              ))}
            </Flex>

            <Flex
              gap="8px"
              width={"100%"}
              padding={"16px"}
              height="70px"
              backgroundColor={"#343541"}
              borderBottomRadius={6}
            >
              <Input
                width="100%"
                color="white"
                height="100%"
                placeholder="query here"
                backgroundColor={"#454654"}
                border={"none"}
                value={prompt}
                onChange={handlePromptInput}
                _placeholder={{ opacity: 10, color: "gray" }}
              />
              <Button
                height="38px"
                onClick={handleClick}
                backgroundColor={"#454654"}
              >
                <PaperPlaneRight color="lightgray" size={20} />
              </Button>

              <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
                {messages.map((m) => (
                  <div key={m.id}>
                    {m.role === "user" ? "User: " : "AI: "}
                    {m.content}
                  </div>
                ))}

                <form onSubmit={handleSubmit}>
                  <label>
                    Say something...
                    <input
                      className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
                      value={input}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="submit">Send</button>
                </form>
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
