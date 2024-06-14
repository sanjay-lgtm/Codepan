import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { FaChevronDown, FaCss3 } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
const CssEditor = ({ value, onChange }) => {
  return (
    <div className='w-full h-full flex flex-col items-start justify-start'>
    <div className='w-full flex items-center justify-between'>
      <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
        <FaCss3 className='text-xl text-sky-500'/>
        <p className='text-primaryText font-semibold'>CSS</p>
      </div>
        <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
          <FcSettings className='text-xl'/>
          <FaChevronDown className='text-xl text-primaryText'/>
        </div>
    </div>
    <CodeMirror
    className='w-full h-full flex-1 bg-secondary py-1'
      value={ value }
      height="100%"
      theme={"dark"}
      extensions={ [css()] }
      onChange={ (value, viewUpdate) => onChange(value, 'css') }
    />

  </div>
  )
}

export default CssEditor
