import { Box, Container } from 'styled-system/jsx'
import { ProfileSection } from './_components/ProfileSection'
import { WorkExperienceSection } from '@/app/(website)/_components/WorkExperienceSection'
import { PageProps } from '@/types/PageProps'
import { ProjectSection } from './_components/ProjectSection'
import { Tabs } from '@/components/tabs'

export default async function Page({ searchParams }: PageProps) {
  const WORK_EXPERIENCE_SECTION = 'workExperienceSection'
  const PROJECT_SECTION = 'projectSection'
  const options = [
    {
      id: WORK_EXPERIENCE_SECTION,
      label: 'Work experiences',
    },
    {
      id: PROJECT_SECTION,
      label: 'Projects',
    },
  ]
  return (
    <Box>
      <Box paddingX="12" paddingBottom="12" paddingTop="24" bg="bg.muted">
        <Container maxWidth="4xl">
          <ProfileSection />
        </Container>
      </Box>

      <Tabs.Root defaultValue={WORK_EXPERIENCE_SECTION}>
        <Box
          position="sticky"
          top="0px"
          py="8"
          px="4"
          bg="bg.muted"
          borderBottomRadius="md"
          zIndex="10"
          maxW="5xl"
          w="100%"
          mx="auto"
        >
          <Tabs.List>
            {options.map((option) => (
              <Tabs.Trigger key={option.id} value={option.id} w="50%">
                {option.label}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
        </Box>
        <Container maxW="4xl">
          <Box w="100%" mx="auto">
            <Tabs.Content value={WORK_EXPERIENCE_SECTION}>
              <WorkExperienceSection searchParams={await searchParams} />
            </Tabs.Content>
            <Tabs.Content value={PROJECT_SECTION}>
              <ProjectSection searchParams={await searchParams} />
            </Tabs.Content>
          </Box>
        </Container>
      </Tabs.Root>
    </Box>
  )
}
