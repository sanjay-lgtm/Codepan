import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheck, MdEdit } from 'react-icons/md';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import Logo from '../assets/Logo.webp';
import JsEditor from '../Editor/JsEditor';
import CssEditor from '../Editor/CssEditor';
import HtmlEditor from '../Editor/HtmlEditor';
import { UserProfileDetails } from '../component';
import Alert from '../component/Alert';
import { Link } from 'react-router-dom';

const NewProject = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const user = useSelector(state => state.user?.user);

  const saveProgram = async () => {
    const id = `${Date.now()}`;
    const projectDoc = {
      id,
      title,
      html,
      css,
      js,
      user
    };
    try {
      await setDoc(doc(db, "Projects", id), projectDoc);
      setAlertMsg("Project saved successfully.");
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    } catch (err) {
      console.error(err);
      setAlertMsg("Error saving project");
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleChange = (value, type) => {
    if (type === 'html') setHtml(value);
    else if (type === 'css') setCss(value);
    else if (type === 'js') setJs(value);
  };

  return (
    <div>
      <AnimatePresence>
        { alert && <Alert status={ "Success" } alertMsg={ alertMsg } /> }
      </AnimatePresence>
      <header className='w-full flex items-center justify-between px-8 md:px-32 py-4'>
        <div className='flex items-center gap-2'>
          <Link to={ "/home" }>
            <img className='w-32 h-auto object-contain' src={ Logo } alt='Logo' />
          </Link>
          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-3'>
              <AnimatePresence>
                { isTitleEdit ? (
                  <motion.input
                    key="TitleInput"
                    className='px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none'
                    type='text'
                    placeholder='Your Title'
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                  />
                ) : (
                  <motion.p
                    key="titleLabel"
                    className='px-3 py-2 text-white text-lg'
                  >
                    { title }
                  </motion.p>
                ) }
              </AnimatePresence>
              <AnimatePresence>
                { isTitleEdit ? (
                  <motion.div
                    key="MdCheck"
                    whileTap={ { scale: 0.9 } }
                    className='cursor-pointer'
                    onClick={ () => setIsTitleEdit(false) }
                  >
                    <MdCheck className='text-2xl text-emerald-500' />
                  </motion.div>
                ) : (
                  <motion.div
                    key="MdEdit"
                    whileTap={ { scale: 0.9 } }
                    className='cursor-pointer'
                    onClick={ () => setIsTitleEdit(true) }
                  >
                    <MdEdit className='text-2xl text-primaryText' />
                  </motion.div>
                ) }
              </AnimatePresence>
            </div>
            <div className='flex items-center gap-2 px-3 -mt-2'>
              <p className='text-primaryText text-sm'>
                { user?.displayName || user?.email.split("@")[0] }
              </p>
              <motion.p whileTap={ { scale: 0.9 } } className='text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer '>
                +Follow
              </motion.p>
            </div>
          </div>
        </div>
        { user && (
          <div className='flex items-center gap-4'>
            <motion.button whileTap={ { scale: 0.9 } } onClick={ saveProgram } className='px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md'>Save</motion.button>
            <UserProfileDetails />
          </div>
        ) }
      </header>
      <div className="codepen-container">
        <Split
          sizes={ [70, 30] }
          minSize={ 100 }
          expandToMin={ false }
          gutterSize={ 10 }
          gutterAlign="center"
          snapOffset={ 30 }
          dragInterval={ 1 }
          direction="vertical"
          cursor="row-resize"
          className="split-vertical"
        >
          <Split
            sizes={ [33, 33, 33] }
            minSize={ 100 }
            expandToMin={ false }
            gutterSize={ 10 }
            gutterAlign="center"
            snapOffset={ 30 }
            dragInterval={ 1 }
            direction="horizontal"
            cursor="col-resize"
            className="split-horizontal"
          >
            <div className="editor-pane">
              <HtmlEditor value={ html } onChange={ handleChange } />
            </div>
            <div className="editor-pane">
              <CssEditor value={ css } onChange={ handleChange } />
            </div>
            <div className="editor-pane">
              <JsEditor value={ js } onChange={ handleChange } />
            </div>
          </Split>
          <div className="output-pane">
            <iframe
              srcDoc={ srcDoc }
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </Split>
      </div>
    </div>
  );
};

export default NewProject;