import type { RichTextState } from '@/utilities/richTextEditor'

function richTextToStringRecursive(
  children: RichTextState['root']['children'],
  initialText: string,
): string {
  for (const item of children) {
    if (item.type === 'text' && typeof item.text === 'string') {
      initialText += item.text
    } else if (Array.isArray(item.children)) {
      initialText += richTextToStringRecursive(item.children, initialText)
    }
  }
  return initialText
}
export function richTextToString(richText: RichTextState): string {
  return richTextToStringRecursive(richText.root.children, '')
}
