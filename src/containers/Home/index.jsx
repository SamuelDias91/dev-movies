import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { Modal } from '../../components/Modal';
import Slider from '../../components/Slider';
import {
	getMovies,
	getMoviesNowPlaying,
	getPopularArtists,
	getPopularSeries,
	getSeriesOnAir,
	getTopMovies,
	getTopSeries,
} from '../../services/getData';
import { getImages } from '../../utils/getImages';
import {
	Background,
	Container,
	ContainerButtons,
	Info,
	Poster,
} from './styles';

function Home() {
	const [showModal, setShowModal] = useState(false);
	const [movie, setMovie] = useState();
	const [topMovies, setTopMovies] = useState();
	const [topSeries, setTopSeries] = useState();
	const [popularSeries, setPopularSeries] = useState();
	const [popularArtists, setPopularArtists] = useState();
	const [moviesNowPlaying, setMoviesNowPlaying] = useState();
	const [seriesOnAir, setSeriesOnAir] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		async function getAllData() {
			Promise.all([
				getMovies(),
				getTopMovies(),
				getTopSeries(),
				getPopularSeries(),
				getPopularArtists(),
				getMoviesNowPlaying(),
				getSeriesOnAir(),
			])
				.then(
					([
						movie,
						topMovies,
						topSeries,
						popularSeries,
						popularArtists,
						moviesNowPlaying,
						seriesOnAir,
					]) => {
						setMovie(movie);
						setTopMovies(topMovies);
						setTopSeries(topSeries);
						setPopularSeries(popularSeries);
						setPopularArtists(popularArtists);
						setMoviesNowPlaying(moviesNowPlaying);
						setSeriesOnAir(seriesOnAir);
					},
				)
				.catch((error) => console.error(error));
		}
		getAllData();
	}, []);

	return (
		<>
			{movie && (
				<Background img={getImages(movie.backdrop_path)}>
					{showModal && (
						<Modal movieId={movie.id} setShowModal={setShowModal} />
					)}
					<Container>
						<Info>
							<h1>{movie.title}</h1>
							<p>{movie.overview}</p>
							<ContainerButtons>
								<Button watch onClick={() => navigate(`/detalhe/${movie.id}`)}>
									Assista Agora
								</Button>
								<Button onClick={() => setShowModal(true)}>
									Assista o Trailer
								</Button>
							</ContainerButtons>
						</Info>
						<Poster>
							<img alt="capa" src={getImages(movie.poster_path)} />
						</Poster>
					</Container>
				</Background>
			)}
			{topMovies && <Slider info={topMovies} title={'Top Filmes'} />}

			{topSeries && <Slider info={topSeries} title={'Top Séries'} />}
			{popularSeries && (
				<Slider info={popularSeries} title={'Séries Populares'} />
			)}
			{popularArtists && (
				<Slider info={popularArtists} title={'Top Artistas'} />
			)}
			{moviesNowPlaying && (
				<Slider info={moviesNowPlaying} title={'Filmes em Cartaz'} />
			)}
			{seriesOnAir && <Slider info={seriesOnAir} title={'Séries Atuais'} />}
		</>
	);
}

export default Home;
