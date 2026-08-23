export type FilterKey =
  | '全部'
  | '评论写作'
  | '深度报道'
  | '纪实影像'
  | '新媒体设计'
  | '编辑排版'

export type MediaKind =
  | 'article'
  | 'video'
  | 'pdf'
  | 'image'
  | 'external'
  | 'document'

export type Work = {
  id: string
  title: string
  filter: Exclude<FilterKey, '全部'>
  section: 'writing' | 'video' | 'publication' | 'visual' | 'wechat' | 'lab'
  kind: MediaKind
  date?: string
  platform?: string
  duration?: string
  summary: string
  quote?: string
  cover?: string
  mediaSrc?: string
  contentSrc?: string
  externalUrl?: string
  award?: string
  role?: string
  note?: string
  featured?: boolean
  orientation?: 'landscape' | 'portrait' | 'square'
}
