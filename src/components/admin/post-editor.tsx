"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useCallback, useRef, useState } from "react";
import { Video } from "@/lib/tiptap-video-extension";
import { uploadMedia } from "@/app/admin/(protected)/posts/media-actions";

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`rounded px-2 py-1 text-sm font-medium transition-colors disabled:opacity-40 ${
        active ? "bg-foreground text-background" : "text-foreground hover:bg-surface"
      }`}
    >
      {children}
    </button>
  );
}

export function PostEditor({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (html: string) => void;
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Video,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[240px] focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const handleFileUpload = useCallback(
    async (file: File, kind: "image" | "video") => {
      if (!editor) return;
      setUploadError(null);
      setUploading(true);
      try {
        const formData = new FormData();
        formData.set("file", file);
        const result = await uploadMedia(formData);
        if ("error" in result) {
          setUploadError(result.error);
          return;
        }
        if (kind === "image") {
          editor.chain().focus().setImage({ src: result.url }).run();
        } else {
          editor.chain().focus().insertContent({ type: "video", attrs: { src: result.url } }).run();
        }
      } catch {
        setUploadError("Falha no upload. Tente novamente.");
      } finally {
        setUploading(false);
      }
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div className="rounded-md border border-border">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface/50 p-2">
        <ToolbarButton
          label="Negrito"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          label="Itálico"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          label="Tachado"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <span className="line-through">S</span>
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-border" />
        <ToolbarButton
          label="Título 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          label="Título 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-border" />
        <ToolbarButton
          label="Lista"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • Lista
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. Lista
        </ToolbarButton>
        <ToolbarButton
          label="Citação"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          &ldquo;Cit.&rdquo;
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-border" />
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            setLinkValue(editor.getAttributes("link").href ?? "");
            setLinkOpen((open) => !open);
          }}
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          label="Inserir imagem"
          disabled={uploading}
          onClick={() => imageInputRef.current?.click()}
        >
          Imagem
        </ToolbarButton>
        <ToolbarButton
          label="Inserir vídeo"
          disabled={uploading}
          onClick={() => videoInputRef.current?.click()}
        >
          Vídeo
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-border" />
        <ToolbarButton
          label="Desfazer"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          ↶
        </ToolbarButton>
        <ToolbarButton
          label="Refazer"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          ↷
        </ToolbarButton>
        {uploading && <span className="text-xs text-muted">Enviando…</span>}
      </div>

      {linkOpen && (
        <div className="flex items-center gap-2 border-b border-border p-2">
          <input
            type="url"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-accent"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (linkValue) {
                  editor.chain().focus().extendMarkRange("link").setLink({ href: linkValue }).run();
                } else {
                  editor.chain().focus().unsetLink().run();
                }
                setLinkOpen(false);
              }
            }}
          />
          <button
            type="button"
            className="text-sm text-accent"
            onClick={() => {
              if (linkValue) {
                editor.chain().focus().extendMarkRange("link").setLink({ href: linkValue }).run();
              } else {
                editor.chain().focus().unsetLink().run();
              }
              setLinkOpen(false);
            }}
          >
            Aplicar
          </button>
        </div>
      )}

      {uploadError && (
        <p className="border-b border-border px-3 py-2 text-xs text-red-700 dark:text-red-400">
          {uploadError}
        </p>
      )}

      <div className="px-4 py-3">
        <EditorContent editor={editor} />
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file, "image");
          e.target.value = "";
        }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file, "video");
          e.target.value = "";
        }}
      />
    </div>
  );
}
