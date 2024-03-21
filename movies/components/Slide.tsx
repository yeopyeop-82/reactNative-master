import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const OverView = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const Votes = styled(OverView)`
  margin-top: 5px;
  font-size: 12px;
`;

const MovieView = styled.View`
  flex: 1;
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: string;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <MovieView>
      <BgImg source={{ uri: makeImgPath(backdrop_path) }} />
      <BlurView
        tint={isDark ? "dark" : "light"}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title>{original_title}</Title>
            <Votes>⭐️{vote_average}/10</Votes>
            <OverView>{overview.slice(0, 80)}...</OverView>
          </Column>
        </Wrapper>
      </BlurView>
    </MovieView>
  );
};

export default Slide;
