import { memo } from "react";
import { Button, Text } from "@chakra-ui/react";

interface PlayButtonProps
{
  stage: "ready" | "playing" | "complete" | "gameover"
}

function PlayButtonComponent ({ stage }: PlayButtonProps)
{
  return (
    <Button
      w={10} minW={10} h={10} px={0}
      borderWidth={3} borderRadius={0} borderLeftColor="#FFFFFF" borderTopColor="#FFFFFF" borderRightColor="#808080" borderBottomColor="#808080"

      bg="#C6C6C6"
      _hover={{ bg: '#D6D6D6' }}
      _active={{ bg: '#CFCFCF', borderWidth: 2, }}
      _focus={{ outline: '0 !important' }}
    >
      <Text fontSize="xl" textShadow='0px 0px 1px #00000080'>
        { stage === "ready" && "🙂" }
        { stage === "playing" && "🙂" }
        { stage === "complete" && "😎" }
        { stage === "gameover" && "💀" }
      </Text>
    </Button>
  );
}

export const PlayButton = memo(PlayButtonComponent);