import { useState } from 'react';
import CodeWindow from '@/components/CodeWindow';
import { AiFillGithub , AiFillLinkedin } from "react-icons/ai";
import { useTheme } from 'next-themes'
import {  FaSun, FaRegMoon } from "react-icons/fa";

export default function Home() {
  const { theme, setTheme } = useTheme()

  const [loading, setLoading] = useState(false);
  const [inputCode, setInputCode] = useState(``);
  const [outputCode, setOutputCode] = useState('');
  const [inputLanguage, setInputLanguage] = useState('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState('Python');


  const handleInputLanguageChange = (option) => {
    setInputLanguage(option.value)
    setInputCode('')
    setOutputCode('')
  }

  const handleOutputLanguageChange = (option) => {
    setOutputLanguage(option.value)
    setOutputCode('')
  }

  const handleTranslate = async () => {
    const maxCodeLength = 6000;

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body = {
      inputLanguage,
      outputLanguage,
      inputCode
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col items-center justify-center bg-white dark:bg-gray-900'>

      <div className='flex'>
        <div>
        <h1 className='font-sans text-5xl justify-center font-bold pt-5 '>Code Translator</h1>
        </div>
        <div>
        <button className="block border-2 border-black ml-5 mt-8 rounded " onClick={()=> setTheme( theme === "dark"? "light": "dark" )}>
        { theme==="dark"? <FaSun className='m-2'/>: <FaRegMoon className='m-2'/> }
        </button>
        </div>
      </div>

      



      <h2 className="font-sans mt-5 text-xl justify-center text-slate-600 mb-10">Translate your code to another programming language. With just a click.</h2>
      {/* input code window */}
      <CodeWindow code={inputCode} setCode={setInputCode} loading={loading} handleLanguageChange={handleInputLanguageChange} language={inputLanguage} />

      {/* translate button */}


      <button disabled={loading} type="button" className="p-3 m-2 flex justify-center items-center rounded-lg text-white font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..." onClick={handleTranslate}>
      {loading ? `Translating...` : `Translate 🔁`}
</button>


      {/* output code window */}
      <CodeWindow code={outputCode} setCode={setOutputCode} loading={loading} handleLanguageChange={handleOutputLanguageChange} language={outputLanguage} />
      <p className="font-sans mt-5 pb-5">Powered by Dhamith Kumara </p>
      <div className='flex'>
      <div><a href='https://github.com/bdhamithkumara'><AiFillGithub style={{width:50, height:50}}/></a></div>
      <div><a href='https://www.linkedin.com/in/bdhamithkumara/'><AiFillLinkedin style={{width:50, height:50}}/></a></div>
      </div>
    </div>

  )
}
