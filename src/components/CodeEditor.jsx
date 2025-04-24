import { useRef, useState } from "react";
import { Box, HStack,Button,Stack,useMediaQuery  } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
const [value,setValue]=useState("")


  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const API_HEADERS = {
    "Content-Type": "application/json",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "X-RapidAPI-Key": "936f1902d0msh22916dd7eb84120p1a31acjsnd17784613993", // Replace with your actual key
  };
  const languages=[{
    id:82,
    name:"SQL"
  },
{
  id:71,
  name:"Python"
},
{
  id:102,
  name:"JavaScript"
},
{
  id:62,
  name:"Java"
},
{
  id:51,
  name:"C#"
},
{
  id:54,
  name:"C++"
},
{
  id:49,
  name:"C"
}];

const [lang,setLang]=useState(71);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const listLang=languages.map((lang)=>{

  
  return (<option style={{color:"white"}}  key={lang.id} value={lang.id}>{lang.name}</option>)
})
const [output,setOutput]=useState("")
const handleClick=async()=>{
try {
  
  const response = await axios.post(
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
    {
      source_code: value,
      language_id:  lang, // default to Python
    },
    { headers: API_HEADERS }
  );

  const result = response.data;
  const resultOutput = result.stdout || result.stderr || result.compile_output || "No output.";
  setOutput(resultOutput);
} catch (error) {
  console.error("Execution error:", error);
  setIsError(true);
  setOutput("Execution failed: " + error.message);
}
}


const [isSmallScreen] = useMediaQuery("(max-width: 600px)");
  return (
    <Box>
            <div style={{
          display: "grid",
          gridTemplateColumns: "30% 30%", // Correct way to define two equal columns
          gap: "30px", // Reduced gap to something more reasonable
          alignItems: "center",
          justifyContent: "center",
          padding: "40px"
        }}>
               <Button
              variant="outline"
              colorScheme="green"
              mb={4}
              
              onClick={handleClick}
              style={{}}
            >
              Run Code
            </Button>
            <select style={{color:"white"}}  value={lang} onChange={(e)=>setLang(e.target.value)} name="" id="">
           {listLang}
            </select>
            </div>
            <Stack direction={isSmallScreen ? "column" : "row"} spacing={4}>
  <Box style={{width:"60%"}} >
    <Editor
      options={{ minimap: { enabled: false } }}
      height="75vh"
      theme="vs-dark"
      onMount={onMount}
      value={value}
      onChange={(value) => setValue(value)}
    />
  </Box>

  <Box style={isSmallScreen ? {width:"90%"} : {width:"900px"}}>
    <Output style={isSmallScreen ? {width:"90%"} : {width:"900px"}}  output={output} editorRef={editorRef} value={value} />
  </Box>
</Stack>
    </Box>
  );
};
export default CodeEditor;
