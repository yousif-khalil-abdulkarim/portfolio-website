import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  type SerializedLinkNode,
  type SerializedListItemNode,
  type SerializedListNode,
  type SerializedParagraphNode,
  type SerializedTextNode,
  type TypedEditorState,
} from '@payloadcms/richtext-lexical'

export type RichTextState = TypedEditorState<
  | SerializedLinkNode
  | SerializedListItemNode
  | SerializedListNode
  | SerializedParagraphNode
  | SerializedTextNode
>

export const richTextEditor = lexicalEditor({
  features: [
    LinkFeature(),
    BoldFeature(),
    StrikethroughFeature(),
    UnderlineFeature(),
    ItalicFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    ParagraphFeature(),
    FixedToolbarFeature(),
  ],
})
