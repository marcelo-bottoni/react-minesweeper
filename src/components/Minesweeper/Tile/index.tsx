import { memo } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface TileProps
{
  x: number;
  y: number;

  stage: string; //"idle" | "flag" | "wrong-flag" | "clear" | "bomb" | "exploded" | "1" | "2" | "3";
}

function TileComponent ({ x, y, stage = "idle" }: TileProps)
{
  // * IDLE Tile
  if (stage === "idle")
  {
    return (
      <Box w={6} h={6}>
        <Button
          w={6} minW={6} h={6} px={0}
          borderWidth={2} borderRadius={0} borderLeftColor="#FFFFFF" borderTopColor="#FFFFFF" borderRightColor="#808080" borderBottomColor="#808080"

          bg="#C6C6C6"
          _hover={{ bg: '#D6D6D6' }}
          _active={{ bg: '#CFCFCF', borderWidth: 0, }}
          _focus={{ outline: '0 !important' }}
        >
        </Button>
      </Box>
    )
  }

  // * FLAG Tile
  else if (stage === "flag")
  {
    return (
      <Box w={6} h={6}>
        <Button
          w={6} minW={6} h={6} px={0}
          borderWidth={2} borderRadius={0} borderLeftColor="#FFFFFF" borderTopColor="#FFFFFF" borderRightColor="#808080" borderBottomColor="#808080"

          bg="#C6C6C6"
          _hover={{ bg: '#D6D6D6' }}
          _active={{ bg: '#D6D6D6' }}
          _focus={{ outline: '0 !important' }}
        >
        <Text fontSize="xs">🚩</Text>
        </Button>
      </Box>
    )
  }

  // * DOUBT Tile
  else if (stage === "doubt")
  {
    return (
      <Box w={6} h={6}>
        <Button
          w={6} minW={6} h={6} px={0}
          borderWidth={2} borderRadius={0} borderLeftColor="#FFFFFF" borderTopColor="#FFFFFF" borderRightColor="#808080" borderBottomColor="#808080"

          bg="#C6C6C6"
          _hover={{ bg: '#D6D6D6' }}
          _active={{ bg: '#D6D6D6' }}
          _focus={{ outline: '0 !important' }}
        >
        <Text fontSize="sm" color="#333" fontWeight="bold" pt="2px">?</Text>
        </Button>
      </Box>
    )
  }

  // * WRONG FLAG Tile
  else if (stage === "wrong-flag")
  {
    return (
      <Box w={6} h={6}>
        <Button
          w={6} minW={6} h={6} px={0}
          borderWidth={2} borderRadius={0} borderLeftColor="#FFFFFF" borderTopColor="#FFFFFF" borderRightColor="#808080" borderBottomColor="#808080"

          bg="#FC9EA0"
          _hover={{ bg: '#FC9EA0' }}
          _active={{ bg: '#FC9EA0' }}
          _focus={{ outline: '0 !important' }}
        >
        <Text fontSize="xs">🚩</Text>
        </Button>
      </Box>
    )
  }

  // * NUMBER Tile
  else if (["1", "2", "3", "4", "5", "6", "7", "8"].includes(stage))
  {
    const colors = ["#0023FB", "#1E8019", "#FA0000", "#000C7E", "#7D0000", "#188180", "#000000", "#808080"];

    return (
      <Box w={6} h={6}>
        <Flex w={6} minW={6} h={6} px={0} borderWidth="0 1px 1px 0" borderColor="#A1A1A1" alignItems="center" justifyContent="center" bg="#C6C6C6">
          <Text pt={1} fontSize="md" fontWeight="bold" color={colors[Number(stage)-1]}>{stage}</Text>
        </Flex>
      </Box>
    )
  }
  
  // * EXPLODED Tile
  else if (stage === "exploded")
  {
    return (
      <Box w={6} h={6}>
        <Flex w={6} minW={6} h={6} px={0} borderWidth="0 1px 1px 0" borderColor="#A1A1A1" alignItems="center" justifyContent="center" bg="#FABBA0">
          <Text pt={1} fontSize="2xl">💥</Text>
        </Flex>
      </Box>
    )
  }

  // * BOMB Tile
  else if (stage === "bomb")
  {
    return (
      <Box w={6} h={6}>
        <Flex w={6} minW={6} h={6} px={0} borderWidth="0 1px 1px 0" borderColor="#A1A1A1" alignItems="center" justifyContent="center" bg="#C6C6C6">
          <Text fontSize="sm">💣</Text>
        </Flex>
      </Box>
    )
  }

  // * CLEAR Tile
  else
  {
    return (
      <Box w={6} h={6}>
        <Flex w={6} minW={6} h={6} px={0} m={0} borderWidth="0 1px 1px 0" borderColor="#A1A1A1" bg="#C6C6C6">
        </Flex>
      </Box>
    )
  }
}

export const Tile = memo(TileComponent, (prevProps, nextProps) =>
{
	return (
    prevProps.stage === nextProps.stage &&
    prevProps.x === nextProps.x &&
    prevProps.y === nextProps.y
  );
});