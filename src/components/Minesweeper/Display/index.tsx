import { memo } from "react";
import { Box, Flex } from "@chakra-ui/react";

interface DisplayProps
{
  value: number
}

export function DisplayComponent ({ value }: DisplayProps)
{
  // Limit the value to a max of 999
  if (value > 999) value = 999;

  // Extract the 3 digits of the value
  const digits = String(value).padStart(3, "0").split("");

  // The digit colors (ON / OFF)
  const on = "#FA0000";
  const off = "#5E0000";

  return (
    <Box w="68px" h={10} px={0} borderWidth={1} borderLeftColor="#A3A3A3" borderTopColor="#A3A3A3" borderRightColor="#EAEAEA" borderBottomColor="#EAEAEA">
      <Flex bg="#000000" h="100%" alignItems="center" justifyContent="space-between" p="2px">

        {
          digits.map((digit, index) =>
          (
            <Box key={index} position="relative" w="20px;" h="100%" pr="1px">
              <Box position="absolute" top="1px" left="2px" w="17px" h="3px" bg={(["0", "2", "3", "5", "7", "8", "9"].includes(digit)) ? on : off} borderRadius={10}/>

              <Box position="absolute" top="4px" left="1px" w="3px" h="12px" bg={(["0", "4", "5", "6", "8", "9"].includes(digit)) ? on : off} borderRadius={10}/>
              <Box position="absolute" top="4px" right="0px" w="3px" h="12px" bg={(["0", "1", "2", "3", "4", "7", "8", "9"].includes(digit)) ? on : off} borderRadius={10}/>

              <Box position="absolute" top="16px" left="2px" w="17px" h="3px" bg={(["2", "3", "4", "5", "6", "8", "9"].includes(digit)) ? on : off} borderRadius={10}/>

              <Box position="absolute" top="19px" left="1px" w="3px" h="12px" bg={(["0", "2", "6", "8"].includes(digit)) ? on : off} borderRadius={10}/>
              <Box position="absolute" top="19px" right="0px" w="3px" h="12px" bg={(["0", "1", "3", "4", "5", "6", "7", "8", "9"].includes(digit)) ? on : off} borderRadius={10}/>

              <Box position="absolute" bottom="2px" left="2px" w="17px" h="3px" bg={(["0", "2", "3", "5", "6", "8", "9"].includes(digit)) ? on : off} borderRadius={10}/>
            </Box>
          ))
        }

      </Flex>
    </Box>
  );
}

export const Display = memo(DisplayComponent);