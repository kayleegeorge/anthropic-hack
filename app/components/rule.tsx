import { Card, Text, CardBody, CardFooter, Flex } from '@chakra-ui/react'
import { PencilSimple } from '@phosphor-icons/react'

export default function Rule(props: {rule: string}) {
    return (
        <Card>
        <CardBody>
            <Flex flexDirection='column'>        
            <Text>{props.rule}</Text>
            <PencilSimple size={24} /></Flex>
        </CardBody>
        </Card>
    )
}
