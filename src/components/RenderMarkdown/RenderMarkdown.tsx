import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
  children: string
}

export default function RenderMarkdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => <a className="text-green-500 underline" target="_blank" rel="noopener noreferrer" {...props} />,
        div: (props) => <div className="space-y-3" {...props} />,
      }}>
      {children}
    </ReactMarkdown>
  )
}
