'use client'

import { IconButton } from '@/components/icon-button'
import { Tooltip } from '@/components/tooltip'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export type ThemeButtonProps = {
  initialIsDark: boolean
}
export function ThemeButton({ initialIsDark }: ThemeButtonProps) {
  const [isDarkMode, setIsDarkMode] = useState(initialIsDark)

  useEffect(() => {
    console.log(isDarkMode)
    if (isDarkMode) {
      document.cookie = `theme=dark;path=/;`
      document.body.classList.add('dark')
      // document.querySelector('html').setAttribute('data-theme', theme);
    } else {
      document.cookie = `theme=light;path=/;`
      document.body.classList.remove('dark')
      // setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, [isDarkMode])

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        asChild
        onClick={() => {
          setIsDarkMode((prevValue) => !prevValue)
        }}
      >
        <IconButton variant="subtle" size="xl">
          {isDarkMode ? <Moon /> : <Sun />}
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        <Tooltip.Content>Click to switch to {isDarkMode ? 'light' : 'dark'} mode</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
