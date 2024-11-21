import { Text } from '@/components/text'

export type DateTextProps = {
  startDate?: string | null
  endDate?: string | null
  current?: boolean | null
}
export function DateText({ startDate, endDate, current }: DateTextProps) {
  return (
    <>
      {startDate && (
        <Text color="fg.muted" fontSize="sm" mb="2">
          {startDate && <>{new Date(startDate).toLocaleDateString()}</>}
          {' - '}
          {startDate && !current && endDate && <>{new Date(endDate).toLocaleDateString()}</>}
          {current && <>current</>}
        </Text>
      )}
    </>
  )
}
