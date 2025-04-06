import React, { useCallback, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";

const MAX_CHARS = 1560;
const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline"],
  [{ align: [] }],
  ["clean"],
]

const TextEditor = ({ socket, slide, index, setSlides, documentId }) => {
  const [quill, setQuill] = useState()
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("join-slide-room", `${documentId}/${slide?._id}`)
  }, [])

  useEffect(() => {
    if (quill && slide?.text) {
      const initialText = quill.getText().trim();
      setCharCount(initialText.length);
    }
  }, [quill, slide]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;

      const currentText = quill.getText().trim();
      const currentLength = currentText.length;

      if (currentLength > MAX_CHARS) {
        const overage = currentLength - MAX_CHARS;

        const selection = quill.getSelection();

        quill.deleteText(MAX_CHARS, MAX_CHARS + overage);

        if (selection) {
          setTimeout(() => quill.setSelection(selection), 0);
        }

        toast(`Maximum ${MAX_CHARS} characters allowed!`);
        return;
      }

      setCharCount(currentLength);
      const html = quill.root.innerHTML;

      setSlides(prev => {
        let temp = [...prev];
        temp[index].text = html;
        return temp;
      });

      socket.emit("send-changes", {
        text: html,
        roomId: `${documentId}/${slide?._id}`,
        index
      });
    };

    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [socket, quill, index, documentId, slide?._id, setSlides]);
  useEffect(() => {
    socket.on("receive-changes", ({ text, roomId, idx }) => {
      if (idx !== index) return
      setSlides(prev => {
        let temp = [...prev];
        if (temp[idx]) {
          temp[idx].text = text;
          return temp;
        }
        return prev;
      })
      if (roomId !== `${documentId}/${slide?._id}`) return
      quill?.clipboard?.dangerouslyPasteHTML(text);
    })

  }, [socket, quill])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.clipboard.dangerouslyPasteHTML(0, slide?.text);
    setQuill(q)
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        height: '500px',
        flexGrow: 1,
        overflowY: 'auto',
        border: '1px solid #dee2e6',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
    </div>
  );
};

export default TextEditor;