

import { Flex, Text } from "@chakra-ui/layout"
import { jetbrains } from "../_app"
import { Button, DarkMode, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export default function Footer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <DarkMode>
        <Button size="sm" marginTop={'20px'} onClick={onOpen} fontWeight={'light'} color={'gray'}>
          Learn More 
        </Button>
      </DarkMode>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay fontFamily={jetbrains.style.fontFamily} />
      <ModalContent>
        <ModalHeader>Why Red Team?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Good question! Red teaming is a form of investigating AI alignment science through having an adversarial mindset in order to understand
          and expose LLM limitations. 
          In order to have safe and equitable models, we need to thoroughly test models explore how
          models act in all kinds of edge case scenarios.  
        </ModalBody>

        <ModalFooter gap = '8px'>
          <Button colorScheme='red' mr={1} onClick={() => window.location.href='https://www.anthropic.com/index/frontier-threats-red-teaming-for-ai-safety'}>
             More on Red Teaming
          </Button>
          <Button backgroundColor='#cc785c' mr={2} onClick={() => window.location.href='https://www.anthropic.com/index/core-views-on-ai-safety'}>Anthropic AI Safety</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
    )
}