import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { FaChevronDown, FaJs } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
const JsEditor = ({ value, onChange }) => {
  return (
    <div className='w-full h-full flex flex-col items-start justify-start'>
    <div className='w-full flex items-center justify-between'>
      <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
        <FaJs className='text-xl text-yellow-500'/>
        <p className='text-primaryText font-semibold'>javascript</p>
      </div>
        <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
          <FcSettings className='text-xl'/>
          <FaChevronDown className='text-xl text-primaryText'/>
        </div>
    </div>
    <div className='w-full h-full px-2'>
    <CodeMirror
     className='h-full'
      value={ value }
      height="100%"
      theme={"dark"}
      extensions={ [javascript()] }
      onChange={ (value, viewUpdate) => onChange(value, 'js') }
    />
    </div>

  </div>
  )
}

export default JsEditor
