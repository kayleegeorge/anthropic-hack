

import { Flex, Text } from "@chakra-ui/layout"
import { jetbrains } from "../_app"
import { Button, DarkMode, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export default function Footer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex position='absolute' left={0} right={0} bottom={0} paddingLeft={'25px'} paddingBottom={'25px'}>
        <DarkMode>
        <Button size="sm" marginTop={'20px'} onClick={onOpen} fontWeight={'light'} color={'gray'}>
          LLM safety 
        </Button>
      </DarkMode>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay fontFamily={jetbrains.style.fontFamily} />
      <ModalContent>
        <ModalHeader fontFamily={jetbrains.style.fontFamily} fontSize={'16px'} marginBottom={'-8px'}>AI Safety is important.</ModalHeader>
        <ModalCloseButton />
        <ModalBody fontFamily={jetbrains.style.fontFamily} fontSize={'14px'}>
          Anthropic's AI Safety team researches both alignment capabilities and alignment science.
          Exploration of alignment capabilities (i.e. developing new algorithms) is the goal of Blue Teaming, whereas the goal of Red Teaming is alignment science, understanding and explosing LLM limitations.
          Claudered is a red teaming vs. blue teaming playground for you to learn what it means to both take an adversarial mindset vs. a defensive mindset when prompting LLMs. 
          LLMs have very real consequences on human thought. As we increasingly rely on LLMs, not only is important for research engineers to thoroughly test and understand how models behave in different scenarios,
          it is also important for consumers to be aware of LLM capabilities.
          <Flex marginBottom={'8px'} marginTop={'12px'} gap='8px' justifyContent={'space-between'}>
        <Button size='sm' onClick={() => location.href= 'https://www.anthropic.com/index/core-views-on-ai-safety'}>AI Safety</Button>
        <Button size='sm' onClick={() => location.href= 'https://dl.acm.org/doi/10.1145/3544548.3581196'}>Thought Study</Button>
        <Button size='sm' onClick={() => location.href= 'https://www.anthropic.com/index/frontier-threats-red-teaming-for-ai-safety'}>Red Teaming</Button> 
        
        </Flex>
        </ModalBody>
        
      </ModalContent>
    </Modal>
    </Flex>
    )
}