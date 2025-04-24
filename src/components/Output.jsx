import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";


const Output = ({ editorRef, value,output }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);



 

  return (
    <Box w="50%">
   
    
     
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
