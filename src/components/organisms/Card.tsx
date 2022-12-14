import { Box, Flex, Image, SlideFade, Stack, Text } from "@chakra-ui/react";
import { isVisible } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonTypeArr } from "../../hooks/usePokemonTypeArr";

import {
  PokemonDetailedData,
  PokemonTypeObj,
  PokemonTypes,
} from "../../types/api/pokemon";

type Props = {
  pokemon: PokemonDetailedData;
  onOpen: () => void;
  loading: boolean;
};

export const Card: FC<Props> = memo((props) => {
  const { pokemon, onOpen ,loading} = props;
  const navigate = useNavigate();

  const { setPokemonType, setPokemonTypeArr } = usePokemonTypeArr();

  const onClickTypes = async (types: PokemonTypes) => {
    const pokemonTypeArr = await axios.get(types.type.url).then((res) => {
      const pokemonArr: Array<PokemonTypeObj> = res.data.pokemon;
      const pokemonDataArr = pokemonArr.map((pokemon) => pokemon.pokemon);
      return pokemonDataArr;
    });
    setPokemonType(types.type.name);
    setPokemonTypeArr(pokemonTypeArr);
    navigate(`/${types.type.name}`);
  };

  return (
    <SlideFade in={!loading}>
      <Box
      bg="white"
      borderRadius="20px"
      shadow="md"
      w={{ base: 150, md: 180, lg: 250 }}
      ml={{ base: 5, md: 15, lg: 25 }}
      mt="2"
      p="3"
      _hover={{ shadow: "lg",transform : "translateY(-4px)"}}
      onClick={onOpen}
    >
      <Stack textAlign="center">
        {pokemon.sprites.front_default !== null ? (
          <Image
            m="auto"
            src={pokemon.sprites.front_default}
            borderRadius="full"
          />
        ) : (
          <h2>No Image</h2>
        )}

        <Text fontSize="lg" fontWeight="bold">{pokemon.name}</Text>
        {pokemon.types.length < 2 ? (
          <Text
            as="a"
            fontSize="sm"
            _hover={{ cursor: "pointer", textColor: "blue.500" }}
            onClick={() => onClickTypes(pokemon.types[0])}
          >
            {pokemon.types[0].type.name}
          </Text>
        ) : (
          <Flex justify="center">
            <Text
              as="a"
              fontSize="sm"
              _hover={{ cursor: "pointer", textColor: "blue.500" }}
              onClick={() => onClickTypes(pokemon.types[0])}
            >
              {pokemon.types[0].type.name}
            </Text>
            <p>,</p>
            <Text
              as="a"
              fontSize="sm"
              _hover={{ cursor: "pointer", textColor: "blue.500" }}
              onClick={() => onClickTypes(pokemon.types[1])}
            >
              {pokemon.types[1].type.name}
            </Text>
          </Flex>
        )}
      </Stack>
    </Box>
    </SlideFade>
  );
});
