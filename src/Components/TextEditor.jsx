import '../styles/textEditorStyle.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useState } from 'react'

// Using a Dictionary and map function on it for every dropbox to avoid code repition
const textTypeOptions = {
  'paragraph' : [0, 'paragraph'],
  'h1' : [1, 'h1'], // [heading level to pass in TipTap, svg Icon]
  'h2' : [2, 'h2'],
  'h3' : [3, 'h3'],
  'h4' : [4, 'h4'],
  'h5' : [5, 'h5'],
  'h6' : [6, 'h6']
}

const MenuBar = ({ editor }) => {

  const [isTextTypeDropdownActive, setIsTextTypeDropdownActive] = useState(false);
  const [selectedTextType, setSelectedTextType] = useState('');

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>

      <div className="dropdown relative select-none bg-green-400 w-[109px]"> {/* Dropdown */}
        <div className="dropdown-btn text-center flex justify-between items-center cursor-pointer bg-slate-400" onClick={() => {setIsTextTypeDropdownActive((prev) => !prev)}}> {/* Dropdown Button */}
          <span>{selectedTextType}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> {/** Dropdown Icon */}
            <path d="M8 11L3 5.99999L3.7 5.29999L8 9.59999L12.3 5.29999L13 5.99999L8 11Z" fill="#212529"/>
          </svg>
        </div>
        {
          isTextTypeDropdownActive && <div className="dropdown-content absolute -bottom-[170px] w-full z-10 bg-red-300"> {/* Dropdown Content */}
            {
              Object.entries(textTypeOptions).map(([key, value]) => {
                if (key === 'paragraph') {
                  return (
                      <div
                        onClick={() => {
                          editor.chain().focus().setParagraph().run()
                          setSelectedTextType(value[1])
                          setIsTextTypeDropdownActive(false)
                        }}
                        className={`${editor.isActive('paragraph') ? 'is-active' : ''} dropdown-item w-full cursor-pointer hover:bg-[#fcfcfc]`}
                      >
                        {key}
                      </div>
                  )
                } else {
                  return (
                      <div
                        onClick={(e) => {
                          editor.chain().focus().toggleHeading({ level: value[0] }).run()
                          setSelectedTextType(value[1])
                          setIsTextTypeDropdownActive(false)
                        }}
                        className={`${editor.isActive('heading', { level: value[0] }) ? 'is-active' : ''} dropdown-item w-full cursor-pointer hover:bg-[#fcfcfc]`}
                      >
                        {key}
                      </div>
                  )
                }
              })
            }
          </div>
        }
      </div>
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </button>
    </>
  )
}

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: ``,
  })

  return (
    <div className='bg-blue-300'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </div>
  )
}

export default TextEditor;