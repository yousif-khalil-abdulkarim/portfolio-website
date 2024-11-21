import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { VStack } from 'styled-system/jsx'
import NextLink from 'next/link'

export default function Page() {
  return (
    <VStack
      h="100vh"
      w="100vw"
      padding="10"
      bg="bg.muted"
      alignItems="center"
      justifyContent="center"
      gap="10"
    >
      <VStack w="100%" maxW="lg" gap="5">
        <Heading
          fontSize={{
            base: '5xl',
            mdDown: '3xl',
          }}
          textAlign="center"
        >
          PAGE NOT FOUND
        </Heading>
        <Button size="xl" variant="ghost" mx="auto" asChild>
          <NextLink href="/" replace>
            Go to profile
          </NextLink>
        </Button>
      </VStack>
    </VStack>
  )
}
