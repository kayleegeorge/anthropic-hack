import { Flex, Text } from "@chakra-ui/layout"
import { jetbrains } from "../_app"
import { Button, DarkMode, Tooltip } from "@chakra-ui/react"

export default function Header() {
    return (
        <Flex width={'100%'} height ='40px' justifyContent='space-between'>
            <Text textStyle={'logo'} textColor={'#cc785c'} fontFamily={jetbrains.style.fontFamily} fontWeight={'900'}>CLAUDE<Text as="span" color={'#E53E3E'}>RED</Text></Text>
           <DarkMode><Tooltip label="coming soon..." aria-label='A tooltip'><Button size='sm'>Leaderboard 🏆</Button></Tooltip></DarkMode> 
        </Flex>
    )
}