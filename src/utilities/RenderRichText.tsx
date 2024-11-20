import { Text, TextProps } from '@/components/text'
import { RichTextState } from '@/utilities/richTextEditor'
import { Link } from '@/components/link'
import NextLink from 'next/link'

type RichTextNodeProps = {
  node: RichTextState['root']['children'][number]
}
function RichTextNode(props: RichTextNodeProps) {
  if (props.node.type === 'paragraph') {
    return (
      <div
        style={{
          paddingLeft: props.node.indent,
        }}
      >
        <RichTextNodes nodes={props.node.children} />
      </div>
    )
  } else if (props.node.type === 'link') {
    if (props.node.fields.linkType === 'custom') {
      return (
        <Link
          style={{
            paddingLeft: props.node.indent,
          }}
          href={props.node.fields.url}
          target={props.node.fields.newTab ? '_blank' : '_self'}
        >
          <RichTextNodes nodes={props.node.children} />
        </Link>
      )
    } else if (props.node.fields.linkType === 'internal') {
      return (
        <Link
          style={{
            paddingLeft: props.node.indent,
          }}
          asChild
        >
          <NextLink
            href={props.node.fields.url}
            target={props.node.fields.newTab ? '_blank' : '_self'}
          >
            <RichTextNodes nodes={props.node.children} />
          </NextLink>
        </Link>
      )
    }
    throw new Error('RichText editor state is invalid')
  } else if (props.node.type === 'text') {
    const isBold = props.node.format === 1
    const isItalic = props.node.format === 2
    const isUnderline = props.node.format === 8
    const isStrikethrough = props.node.format === 4
    return (
      <span
        style={{
          fontWeight: isBold ? 'bold' : undefined,
          fontStyle: isItalic ? 'italic' : undefined,
          textDecorationStyle: isUnderline || isStrikethrough ? 'solid' : undefined,
          textDecorationLine: isUnderline
            ? 'underline'
            : isStrikethrough
              ? 'line-through'
              : undefined,
        }}
      >
        {props.node.text}
      </span>
    )
  } else if (props.node.type === 'list') {
    if (props.node.tag === 'ol') {
      return (
        <ol
          style={{
            listStyle: 'decimal',
            paddingLeft: props.node.indent,
          }}
        >
          <RichTextNodes nodes={props.node.children} />
        </ol>
      )
    }
    if (props.node.tag === 'ul') {
      return (
        <ul
          style={{
            listStyle: 'circle',
            paddingLeft: props.node.indent,
          }}
        >
          <RichTextNodes nodes={props.node.children} />
        </ul>
      )
    }
    throw new Error('RichText editor state is invalid')
  } else if (props.node.type === 'listitem') {
    return (
      <li
        style={{
          listStylePosition: 'inside',
          paddingLeft: props.node.indent,
        }}
      >
        <RichTextNodes nodes={props.node.children} />
      </li>
    )
  }
  throw new Error('RichText editor state is invalid')
}

type RichTextNodesProps = {
  nodes: RichTextState['root']['children']
}
function RichTextNodes(props: RichTextNodesProps) {
  return (
    <>
      {props.nodes.map((node, index) => (
        <RichTextNode key={index.toString()} node={node} />
      ))}
    </>
  )
}

export type RenderRichTextProps = Omit<TextProps, 'as'> & {
  state: RichTextState
}
export function RenderRichText({ state, ...restProps }: RenderRichTextProps) {
  return (
    <Text as="div" {...restProps}>
      <RichTextNodes nodes={state.root.children} />
    </Text>
  )
}
