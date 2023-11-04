import { Flex, Text } from "@chakra-ui/layout"
import { jetbrains } from "../_app"

export default function Header() {
    return (
        <Flex width={'100%'} height ='40px'>
            <Text textStyle={'logo'} textColor={'#cc785c'} fontFamily={jetbrains.style.fontFamily} fontWeight={'900'}>CLAUDE<Text as="span" color={'#E53E3E'}>RED</Text></Text>
        </Flex>
    )
}