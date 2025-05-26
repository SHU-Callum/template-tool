import { Fragment, ReactNode } from "react";
import { useDisplayMode } from "../../context/templateDisplay/useDisplayMode";

// Helper to recursively render Tiptap JSON as HTML, targeting marks and input fields
function renderNode(node: any, inputFields: Record<string, string>) {
  if (!node) return null;
  if (node.type === "text") {
    let content: ReactNode = node.text || "";
    if (node.marks) {
        node.marks.forEach((mark: any) => {
        if (mark.type === "bold") content = <strong>{content}</strong>;
        if (mark.type === "italic") content = <em>{content}</em>;
        if (mark.type === "underline") content = <u>{content}</u>;
        if (mark.type === "strike") content = <s>{content}</s>;
      });
    }
    return content;
  }
  if (node.type === "textInput") {
    // Replace input node with a span (or just the value)
    return <span className="inline">{inputFields[node.attrs.id] ?? ""}</span>;
  }

  // Converts TipTap node types to HTML tags
  const Tag = node.type === "paragraph" 
    ? "p"
  : node.type === "orderedList"
    ? "ol"
  : node.type === "bulletList"
    ? "ul"
  : node.type === "listItem"
    ? "li" 
  : node.type === "heading"
    ? `h${node.attrs?.level || 1}` as keyof JSX.IntrinsicElements
  : node.type;

  // Render nodes recursively
  return (
    <Tag>
      {node.content &&
        node.content.map((child: any, idx: number) => (
          <Fragment key={child.attrs?.id ?? idx}>
            {renderNode(child, inputFields)}
          </Fragment>
        ))}
        {!node.content && node.type === "paragraph" && <br />}
    </Tag>
  );
}

const RenderModeView = ({ content }: { content: any }) => {
    const { inputFields } = useDisplayMode();
  // content is the Tiptap JSON doc
  if (!content || !content.content) return null;
  return (
    <>
      {content.content.map((node: any, i: number) => (
        <Fragment key={i}>{renderNode(node, inputFields)}</Fragment>
      ))}
    </>
  );
};

export default RenderModeView;