import React from 'react'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/edit_in_popup.min.js'
import 'froala-editor/js/plugins/markdown.min.js'
import 'froala-editor/js/plugins/save.min.js'
import 'froala-editor/js/plugins/fullscreen.min.js'
import 'froala-editor/js/plugins/emoticons.min.js'
import 'froala-editor/js/plugins/font_size.min.js'
import TEInstructions from './TEInstructions';


const TextEditor = ({model, setModel, data, setData}) => {
   

  return (
    <div className=' mb-5'>      <br></br>
    <br></br>
    <TEInstructions/>
    <div className='TextEditorSize container justify-content-center align-items-center' id="hello">
        <FroalaEditor
        model={model}
        onModelChange={(e) => setModel(e)}
        config={{
          placeholderText: "write something....",
          saveInterval: 500,
          attribution: false,
          toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'insertImage', 'fontSize', 'insertHR', 'emoticons', 'fullscreen', 'undo', 'redo'],
          saveMethod : 'Post',
          events: {
            'save.before': function (html) {
              localStorage.setItem('story', html);
            },
            // contentChanged: function(){
            //   const text = this.html.get();
            //   setData(text)
            // },
          },

        }}


      />


    </div>
    <br></br></div>
  )
}

export default TextEditor