import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";

const Output = ({ editorRef, value }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
const listLang=languages.map((lang)=>{

  
  return (<option key={lang.id} value={lang.id}>{lang.name}</option>)
})
  const runCode = async () => {

    const sourceCode = editorRef?.current?.getValue?.() || value;
    if (!sourceCode) return;

    setIsLoading(true);
    setIsError(false);
    setOutput(null);

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: sourceCode,
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

    setIsLoading(false);
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <select value={lang} onChange={(e)=>setLang(e.target.value)} name="" id="">
     {listLang}
      </select>
      <Box
        height="75vh"
        p={2}
        overflowY="auto"
        color={isError ? "red.400" : "gray.800"}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
        bg="gray.50"
        fontFamily="monospace"
        whiteSpace="pre-wrap"
      >
        {output || 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
