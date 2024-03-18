import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  View,
  useColorScheme,
} from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";

const API_KEY = "9709682abb450898fa987d9291a6c9c2";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const MovieView = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
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

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
        loop
        horizontal
        autoplay={true}
        autoplayTimeout={3.5}
        showsPagination={false}
      >
        {nowPlaying.map((movie) => (
          <MovieView key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }} />
            <BlurView
              tint={isDark ? "dark" : "light"}
              style={{ width: "100%", height: "100%", position: "absolute" }}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Votes>⭐️{movie.vote_average}/10</Votes>
                  <OverView>{movie.overview.slice(0, 80)}...</OverView>
                </Column>
              </Wrapper>
            </BlurView>
          </MovieView>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
