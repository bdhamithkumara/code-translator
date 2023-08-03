import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { eclipse } from "@uiw/codemirror-theme-eclipse";


const CodeEditor = ({ code = '', editable = false, setCode, language }) => {

  const [copyText, setCopyText] = useState('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copyText]);

  const config = {
    lineNumbers: true,
    mode: language, // Programming language mode
    indentUnit: 4, // Number of spaces per indent
    smartIndent: true, // Smart indentation
    indentWithTabs: false, // Use spaces instead of tabs
    electricChars: true, // Automatically add closing brackets, quotes, etc.
    autoCloseBrackets: true, // Automatically close brackets
    matchBrackets: true, // Highlight matching brackets
    extraKeys: { 'Ctrl-Space': 'autocomplete' }, // Shortcut for autocomplete
    indent: {
      auto: true,
    },
  };

  return (
    <div className="relative border-2 border-t-0 border-black rounded-b-lg">

      <button
        className="absolute right-1 top-1 z-10 rounded bg-[#C53AAE] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A] "
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >

      </button>


      <CodeMirror
          editable={editable}
          value={code}
          minHeight="300px"
          maxHeight="300px"
          extensions={[StreamLanguage.define(go)]} 
          config={config}
          onChange={(value) => setCode(value)}
          className="rounded-b-xl"
      />
    </div>
  );
};


export default CodeEditor;
