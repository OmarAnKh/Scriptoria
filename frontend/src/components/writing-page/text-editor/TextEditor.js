import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import TEInstructions from './TEInstructions';


const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline"],
  [{ align: [] }],
  ["image"],
  ["clean"],
]

export default function TextEditor({ socket, state }) {
  const { id: documentId } = useParams()
  const [quill, setQuill] = useState()
  useEffect(() => { }, [state])


  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
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
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])
  return (
    <div className='mb-5'>
      <br></br>
      <br></br>
      <TEInstructions />
      <div className='TextEditorSize container justify-content-center align-items-center bg-light p-0 rounded-3 border-none' style={{ position: 'relative' }} id="hello">
        {state ? <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          cursor: 'not-allowed',
        }}></div> : <></>}

        <div ref={wrapperRef} className=""></div>
      </div>
      <br></br>
    </div>
  )
}
