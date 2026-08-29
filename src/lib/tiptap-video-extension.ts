import { Node, mergeAttributes } from "@tiptap/core";

// Tiptap's starter kit has no video node, so this adds a minimal one:
// a self-contained <video controls> block referencing a Blob URL.
export const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "video" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(HTMLAttributes, { controls: "true", style: "max-width: 100%;" }),
    ];
  },
});
