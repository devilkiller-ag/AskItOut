import '../styles/textEditorStyle.css'

import React, { useState, useCallback } from 'react'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Underline from '@tiptap/extension-underline'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'

/** Import Highlight Features for code block */
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all highlight.js languages
import { lowlight } from 'lowlight'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

// Using a Dictionary and map function on it for every dropbox to avoid code repition
const textTypeOptions = {
  'Normal text' : [0, 'Normal text'],
  'h1' : [1, `Heading 1`], // [heading level to pass in TipTap, svg Icon]
  'h2' : [2, 'Heading 2'],
  'h3' : [3, 'Heading 3'],
  'h4' : [4, 'Heading 4'],
  'h5' : [5, 'Heading 5'],
  'h6' : [6, 'Heading 6']
}

const MenuBar = ({ editor }) => {

  // Text Type Dropdown Settings
  const [isTextTypeDropdownActive, setIsTextTypeDropdownActive] = useState(false);
  const [selectedTextType, setSelectedTextType] = useState('Normal text');

  // Link URL Settings
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  // Add Image settings
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])


  if (!editor) {
    return null
  }

  return (
    <div className='flex'>
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 6.25H4.88438L7.12625 4.00875L6.25 3.125L2.5 6.875L6.25 10.625L7.12625 9.74063L4.88625 7.5H12.5C13.4946 7.5 14.4484 7.89509 15.1517 8.59835C15.8549 9.30161 16.25 10.2554 16.25 11.25C16.25 12.2446 15.8549 13.1984 15.1517 13.9017C14.4484 14.6049 13.4946 15 12.5 15H7.5V16.25H12.5C13.8261 16.25 15.0979 15.7232 16.0355 14.7855C16.9732 13.8479 17.5 12.5761 17.5 11.25C17.5 9.92392 16.9732 8.65215 16.0355 7.71447C15.0979 6.77678 13.8261 6.25 12.5 6.25Z" fill="#212529"/>
        </svg>
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 6.25H15.1156L12.8737 4.00875L13.75 3.125L17.5 6.875L13.75 10.625L12.8737 9.74063L15.1137 7.5H7.5C6.50544 7.5 5.55161 7.89509 4.84835 8.59835C4.14509 9.30161 3.75 10.2554 3.75 11.25C3.75 12.2446 4.14509 13.1984 4.84835 13.9017C5.55161 14.6049 6.50544 15 7.5 15H12.5V16.25H7.5C6.17392 16.25 4.90215 15.7232 3.96447 14.7855C3.02678 13.8479 2.5 12.5761 2.5 11.25C2.5 9.92392 3.02678 8.65215 3.96447 7.71447C4.90215 6.77678 6.17392 6.25 7.5 6.25V6.25Z" fill="#212529"/>
        </svg>
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
                        {value[1]}
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
                        {value[1]}
                      </div>
                  )
                }
              })
            }
          </div>
        }
      </div>
      
      <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </button>

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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.4062 15.625H5.625V4.375H10.9375C11.5639 4.37504 12.1771 4.55435 12.7048 4.89174C13.2325 5.22914 13.6526 5.71052 13.9155 6.27903C14.1784 6.84754 14.2731 7.47942 14.1884 8.10001C14.1037 8.72061 13.8431 9.30399 13.4375 9.78125C13.9673 10.205 14.3528 10.7825 14.5408 11.4344C14.7289 12.0862 14.7102 12.7803 14.4875 13.4211C14.2647 14.0619 13.8488 14.6179 13.297 15.0126C12.7452 15.4073 12.0847 15.6213 11.4062 15.625ZM7.5 13.75H11.3937C11.5784 13.75 11.7613 13.7136 11.9319 13.643C12.1025 13.5723 12.2575 13.4687 12.3881 13.3381C12.5187 13.2075 12.6223 13.0525 12.693 12.8819C12.7636 12.7113 12.8 12.5284 12.8 12.3438C12.8 12.1591 12.7636 11.9762 12.693 11.8056C12.6223 11.635 12.5187 11.48 12.3881 11.3494C12.2575 11.2188 12.1025 11.1152 11.9319 11.0445C11.7613 10.9739 11.5784 10.9375 11.3937 10.9375H7.5V13.75ZM7.5 9.0625H10.9375C11.1222 9.0625 11.305 9.02613 11.4756 8.95546C11.6463 8.88478 11.8013 8.7812 11.9319 8.65062C12.0625 8.52004 12.166 8.36501 12.2367 8.1944C12.3074 8.02378 12.3438 7.84092 12.3438 7.65625C12.3438 7.47158 12.3074 7.28872 12.2367 7.1181C12.166 6.94749 12.0625 6.79246 11.9319 6.66188C11.8013 6.5313 11.6463 6.42772 11.4756 6.35704C11.305 6.28637 11.1222 6.25 10.9375 6.25H7.5V9.0625Z" fill="#212529"/>
        </svg>
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.625 5.625V4.375H7.5V5.625H10.7125L7.98125 14.375H4.375V15.625H12.5V14.375H9.2875L12.0187 5.625H15.625Z" fill="#212529"/>
        </svg>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 16.25H17.5V17.5H2.5V16.25ZM10 14.375C8.83968 14.375 7.72688 13.9141 6.90641 13.0936C6.08594 12.2731 5.625 11.1603 5.625 10V3.125H6.875V10C6.875 10.8288 7.20424 11.6237 7.79029 12.2097C8.37634 12.7958 9.1712 13.125 10 13.125C10.8288 13.125 11.6237 12.7958 12.2097 12.2097C12.7958 11.6237 13.125 10.8288 13.125 10V3.125H14.375V10C14.375 11.1603 13.9141 12.2731 13.0936 13.0936C12.2731 13.9141 11.1603 14.375 10 14.375V14.375Z" fill="#212529"/>
        </svg>
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 9.37502H11.2225C10.945 9.30039 10.6662 9.23059 10.3863 9.16564C8.63125 8.75064 7.63875 8.44689 7.63875 7.02627C7.6245 6.78103 7.66081 6.53548 7.74542 6.30486C7.83004 6.07424 7.96115 5.86347 8.13062 5.68564C8.6615 5.24908 9.32644 5.00852 10.0137 5.00439C11.7825 4.96064 12.5981 5.56064 13.265 6.47314L14.2744 5.73564C13.8019 5.05711 13.1578 4.51617 12.4078 4.16808C11.6578 3.81999 10.8288 3.67723 10.0056 3.75439C8.99439 3.76085 8.01887 4.12911 7.25563 4.79252C6.96634 5.08595 6.74024 5.43554 6.59125 5.81971C6.44227 6.20389 6.37356 6.61451 6.38937 7.02627C6.36197 7.47682 6.4466 7.92714 6.63572 8.337C6.82483 8.74686 7.11254 9.10349 7.47312 9.37502H2.5V10.625H11.0325C12.2619 10.9813 12.9969 11.445 13.0156 12.7238C13.0359 12.9969 12.9985 13.2713 12.9056 13.529C12.8128 13.7867 12.6667 14.0219 12.4769 14.2194C11.8155 14.7407 10.9938 15.0166 10.1519 15C9.52345 14.9818 8.90738 14.8209 8.35029 14.5296C7.7932 14.2382 7.30966 13.8239 6.93625 13.3181L5.97812 14.1206C6.46358 14.7676 7.08994 15.2955 7.80972 15.6645C8.52951 16.0334 9.32384 16.2336 10.1325 16.25H10.195C11.3492 16.2633 12.4695 15.8596 13.35 15.1131C13.6625 14.7981 13.9054 14.421 14.0632 14.0062C14.2209 13.5914 14.2898 13.1481 14.2656 12.705C14.289 11.947 14.0332 11.2069 13.5469 10.625H17.5V9.37502Z" fill="#212529"/>
        </svg>
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.375 10L15 14.375L14.1188 13.4938L17.6063 10L14.1188 6.50625L15 5.625L19.375 10ZM0.625 10L5 5.625L5.88125 6.50625L2.39375 10L5.88125 13.4938L5 14.375L0.625 10Z" fill="#212529"/>
        </svg>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.375 7.5C5.41053 7.5 6.25 6.66053 6.25 5.625C6.25 4.58947 5.41053 3.75 4.375 3.75C3.33947 3.75 2.5 4.58947 2.5 5.625C2.5 6.66053 3.33947 7.5 4.375 7.5Z" fill="#212529"/>
          <path d="M4.375 16.25C5.41053 16.25 6.25 15.4105 6.25 14.375C6.25 13.3395 5.41053 12.5 4.375 12.5C3.33947 12.5 2.5 13.3395 2.5 14.375C2.5 15.4105 3.33947 16.25 4.375 16.25Z" fill="#212529"/>
          <path d="M10 13.75H18.75V15H10V13.75ZM10 5H18.75V6.25H10V5Z" fill="#212529"/>
        </svg>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13.75H18.75V15H10V13.75ZM10 5H18.75V6.25H10V5ZM5 7.5V2.5H3.75V3.125H2.5V4.375H3.75V7.5H2.5V8.75H6.25V7.5H5ZM6.25 17.5H2.5V15C2.5 14.6685 2.6317 14.3505 2.86612 14.1161C3.10054 13.8817 3.41848 13.75 3.75 13.75H5V12.5H2.5V11.25H5C5.33152 11.25 5.64946 11.3817 5.88388 11.6161C6.1183 11.8505 6.25 12.1685 6.25 12.5V13.75C6.25 14.0815 6.1183 14.3995 5.88388 14.6339C5.64946 14.8683 5.33152 15 5 15H3.75V16.25H6.25V17.5Z" fill="#212529"/>
        </svg>
      </button>

      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.2813 4.22503C17.9329 3.87543 17.5189 3.59804 17.0631 3.40877C16.6073 3.2195 16.1186 3.12207 15.625 3.12207C15.1315 3.12207 14.6428 3.2195 14.187 3.40877C13.7312 3.59804 13.3172 3.87543 12.9688 4.22503L13.8563 5.11253C14.089 4.87984 14.3652 4.69526 14.6692 4.56934C14.9733 4.44341 15.2991 4.37859 15.6282 4.37859C15.9572 4.37859 16.2831 4.44341 16.5871 4.56934C16.8911 4.69526 17.1674 4.87984 17.4 5.11253C17.6327 5.34521 17.8173 5.62145 17.9432 5.92547C18.0692 6.22949 18.134 6.55533 18.134 6.8844C18.134 7.21347 18.0692 7.53931 17.9432 7.84333C17.8173 8.14735 17.6327 8.42359 17.4 8.65628L12.4 13.6563C11.9309 14.1262 11.2944 14.3905 10.6304 14.3911C9.96638 14.3917 9.32935 14.1285 8.85942 13.6594C8.38949 13.1903 8.12515 12.5537 8.12457 11.8897C8.12398 11.2257 8.38719 10.5887 8.85629 10.1188L9.73754 9.23128L8.85629 8.34378L7.96879 9.23128C7.61919 9.57966 7.3418 9.99364 7.15253 10.4495C6.96326 10.9053 6.86583 11.394 6.86583 11.8875C6.86583 12.3811 6.96326 12.8698 7.15253 13.3256C7.3418 13.7814 7.61919 14.1954 7.96879 14.5438C8.67597 15.2419 9.63134 15.6308 10.625 15.625C11.1205 15.6271 11.6114 15.5309 12.0695 15.3421C12.5276 15.1533 12.9437 14.8756 13.2938 14.525L18.2938 9.52503C18.9944 8.82025 19.3866 7.86619 19.3842 6.87244C19.3819 5.87869 18.9852 4.9265 18.2813 4.22503Z" fill="#212529"/>
        <path d="M2.61879 15.5125C2.38541 15.2802 2.20022 15.0041 2.07386 14.7C1.94749 14.396 1.88244 14.0699 1.88244 13.7407C1.88244 13.4114 1.94749 13.0853 2.07386 12.7813C2.20022 12.4772 2.38541 12.2011 2.61879 11.9688L7.61879 6.96878C7.85109 6.7354 8.1272 6.55021 8.43127 6.42384C8.73534 6.29748 9.06138 6.23243 9.39067 6.23243C9.71995 6.23243 10.046 6.29748 10.3501 6.42384C10.6541 6.55021 10.9302 6.7354 11.1625 6.96878C11.3944 7.2029 11.577 7.48119 11.6994 7.78716C11.8218 8.09313 11.8815 8.42055 11.875 8.75003C11.8769 9.08053 11.8133 9.40813 11.6878 9.71388C11.5623 10.0196 11.3774 10.2974 11.1438 10.5313L9.81879 11.875L10.7063 12.7625L12.0313 11.4375C12.7366 10.7322 13.1328 9.77561 13.1328 8.77815C13.1328 7.78069 12.7366 6.82409 12.0313 6.11878C11.326 5.41347 10.3694 5.01723 9.37192 5.01723C8.37446 5.01723 7.41785 5.41347 6.71254 6.11878L1.71254 11.1188C1.362 11.4673 1.08382 11.8816 0.893994 12.338C0.704168 12.7944 0.606445 13.2839 0.606445 13.7782C0.606445 14.2725 0.704168 14.7619 0.893994 15.2183C1.08382 15.6747 1.362 16.089 1.71254 16.4375C2.42431 17.1303 3.38185 17.5124 4.37504 17.5C5.37698 17.501 6.33862 17.1055 7.05004 16.4L6.16254 15.5125C5.93025 15.7459 5.65413 15.9311 5.35006 16.0575C5.04599 16.1838 4.71995 16.2489 4.39067 16.2489C4.06138 16.2489 3.73534 16.1838 3.43127 16.0575C3.1272 15.9311 2.85109 15.7459 2.61879 15.5125Z" fill="#212529"/>
      </svg>
      </button>

      <button onClick={addImage}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.875 12.75C16.2458 12.75 16.6084 12.64 16.9167 12.434C17.225 12.228 17.4654 11.9351 17.6073 11.5925C17.7492 11.2499 17.7863 10.8729 17.714 10.5092C17.6416 10.1455 17.463 9.8114 17.2008 9.54917C16.9386 9.28695 16.6045 9.10837 16.2408 9.03603C15.8771 8.96368 15.5001 9.00081 15.1575 9.14273C14.8149 9.28464 14.522 9.52496 14.316 9.83331C14.11 10.1416 14 10.5042 14 10.875C14 11.3723 14.1975 11.8492 14.5492 12.2008C14.9008 12.5525 15.3777 12.75 15.875 12.75ZM15.875 10.25C15.9986 10.25 16.1195 10.2867 16.2222 10.3553C16.325 10.424 16.4051 10.5216 16.4524 10.6358C16.4997 10.75 16.5121 10.8757 16.488 10.9969C16.4639 11.1182 16.4044 11.2295 16.3169 11.3169C16.2295 11.4043 16.1182 11.4639 15.9969 11.488C15.8757 11.5121 15.75 11.4997 15.6358 11.4524C15.5216 11.4051 15.424 11.325 15.3553 11.2222C15.2867 11.1195 15.25 10.9986 15.25 10.875C15.25 10.7092 15.3158 10.5503 15.4331 10.4331C15.5503 10.3158 15.7092 10.25 15.875 10.25Z" fill="#212529"/>
        <path d="M20.25 6.5H7.75C7.41848 6.5 7.10054 6.6317 6.86612 6.86612C6.6317 7.10054 6.5 7.41848 6.5 7.75V20.25C6.5 20.5815 6.6317 20.8995 6.86612 21.1339C7.10054 21.3683 7.41848 21.5 7.75 21.5H20.25C20.5815 21.5 20.8995 21.3683 21.1339 21.1339C21.3683 20.8995 21.5 20.5815 21.5 20.25V7.75C21.5 7.41848 21.3683 7.10054 21.1339 6.86612C20.8995 6.6317 20.5815 6.5 20.25 6.5ZM20.25 20.25H7.75V16.5L10.875 13.375L14.3688 16.8688C14.603 17.1016 14.9198 17.2322 15.25 17.2322C15.5802 17.2322 15.897 17.1016 16.1312 16.8688L17.125 15.875L20.25 19V20.25ZM20.25 17.2313L18.0062 14.9875C17.772 14.7547 17.4552 14.624 17.125 14.624C16.7948 14.624 16.478 14.7547 16.2438 14.9875L15.25 15.9813L11.7562 12.4875C11.522 12.2547 11.2052 12.124 10.875 12.124C10.5448 12.124 10.228 12.2547 9.99375 12.4875L7.75 14.7313V7.75H20.25V17.2313Z" fill="#212529"/>
      </svg>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.375 10L15 14.375L14.1188 13.4938L17.6063 10L14.1188 6.50625L15 5.625L19.375 10ZM0.625 10L5 5.625L5.88125 6.50625L2.39375 10L5.88125 13.4938L5 14.375L0.625 10ZM7.7625 15.9275L11.025 3.75L12.2325 4.07313L8.97 16.25L7.7625 15.9275Z" fill="#212529"/>
        </svg>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 9.375H3.81875C3.93491 8.60146 4.21112 7.86066 4.62974 7.1999C5.04837 6.53914 5.6002 5.97295 6.25 5.5375L7.36875 4.7875L6.68125 3.75L5.5625 4.5C4.6208 5.12755 3.84857 5.97785 3.31433 6.97545C2.7801 7.97305 2.50038 9.08711 2.5 10.2188V14.375C2.5 14.7065 2.6317 15.0245 2.86612 15.2589C3.10054 15.4933 3.41848 15.625 3.75 15.625H7.5C7.83152 15.625 8.14946 15.4933 8.38388 15.2589C8.6183 15.0245 8.75 14.7065 8.75 14.375V10.625C8.75 10.2935 8.6183 9.97554 8.38388 9.74112C8.14946 9.5067 7.83152 9.375 7.5 9.375ZM16.25 9.375H12.5688C12.6849 8.60146 12.9611 7.86066 13.3797 7.1999C13.7984 6.53914 14.3502 5.97295 15 5.5375L16.1188 4.7875L15.4375 3.75L14.3125 4.5C13.3708 5.12755 12.5986 5.97785 12.0643 6.97545C11.5301 7.97305 11.2504 9.08711 11.25 10.2188V14.375C11.25 14.7065 11.3817 15.0245 11.6161 15.2589C11.8505 15.4933 12.1685 15.625 12.5 15.625H16.25C16.5815 15.625 16.8995 15.4933 17.1339 15.2589C17.3683 15.0245 17.5 14.7065 17.5 14.375V10.625C17.5 10.2935 17.3683 9.97554 17.1339 9.74112C16.8995 9.5067 16.5815 9.375 16.25 9.375Z" fill="#212529"/>
        </svg>
      </button>

      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="9.375" width="15" height="1.25" fill="#212529"/>
      </svg>
      </button>
    </div>
  )
}

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Underline,
      Link,
      Dropcursor,
      Image,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
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
    <div className='w-full h-screen bg-[#f2f2f2] p-4'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </div>
  )
}

export default TextEditor;