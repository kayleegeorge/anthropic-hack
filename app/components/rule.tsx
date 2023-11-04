import { Card, Text, CardBody, CardFooter } from '@chakra-ui/react'
import { PencilSimple } from '@phosphor-icons/react'

export default function Rule(props: {rule: string}) {
    return (
        <Card>
            <CardBody>
            <Text>{props.rule}</Text>
            </CardBody>
            <CardFooter>
            <PencilSimple size={24} />
            </CardFooter>
        </Card>
    )
}
