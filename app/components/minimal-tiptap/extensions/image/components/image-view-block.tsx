import { isNumber, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useMemo } from "react";
import { useImageLoad } from "../../../hooks/use-image-load";
import { cn } from "@/lib/utils";
import ImageConfig from "./image-config";

const ImageViewBlock = ({
  editor,
  node,
  getPos,
  updateAttributes,
}: NodeViewProps) => {
  const imgSize = useImageLoad(node.attrs.src);

  const paddingBottom = useMemo(() => {
    if (!imgSize.width || !imgSize.height) {
      return 0;
    }

    return (imgSize.height / imgSize.width) * 100;
  }, [imgSize.width, imgSize.height]);

  // const updateAttributes = (attrs: Record<string, any>) => {
  //   if (typeof getPos === "function") {
  //     editor
  //       .chain()
  //       .focus()
  //       .setNodeSelection(getPos())
  //       .updateAttributes(attrs)
  //       .run();
  //   }
  // };

  return (
    <NodeViewWrapper>
      <div draggable data-drag-handle>
        <figure>
          <div
            className="relative w-full"
            style={{
              paddingBottom: `${isNumber(paddingBottom) ? paddingBottom : 0}%`,
            }}
          >
            <div className="absolute h-full w-full">
              <div
                className={cn(
                  "relative h-full max-h-full w-full max-w-full rounded transition-all",
                )}
                style={{
                  boxShadow:
                    editor.state.selection.from === getPos()
                      ? "0 0 0 1px hsl(var(--primary))"
                      : "none",
                }}
              >
                <div className="relative flex h-full max-h-full w-full max-w-full overflow-hidden">
                  {/* @ts-expect-error Passing the types wrongly */}
                  <ImageConfig
                    updateAttributes={updateAttributes}
                    node={node}
                  />
                  {/* eslint-disable-next-line */}
                  <img
                    alt={node.attrs.alt || "Image"}
                    src={node.attrs.src}
                    className="absolute w-full left-2/4 top-2/4 m-0 h-full max-w-full -translate-x-2/4 -translate-y-2/4 transform object-contain"
                    style={{ width: node.attrs.width || "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {node.attrs.title && (
            <figcaption className="text-center mt-2">
              {node.attrs.title}
            </figcaption>
          )}
        </figure>
      </div>
    </NodeViewWrapper>
  );
};

export { ImageViewBlock };
