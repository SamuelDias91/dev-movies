import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { Modal } from '../../components/Modal';
import Slider from '../../components/Slider';
import {
	getMoviePage,
	getMoviesNowPlaying,
	getMoviesPop,
	getPopularArtists,
	getTopMovies,
} from '../../services/getData';
import { getImages } from '../../utils/getImages';
import {
	Background,
	Container,
	ContainerButtons,
	Info,
	Poster,
} from './styles';

function Movies() {
	const [showModal, setShowModal] = useState(false);
	const [movie, setMovie] = useState();
	const [moviesPop, setMoviesPop] = useState();
	const [topMovies, setTopMovies] = useState();
	const [popularArtists, setPopularArtists] = useState();
	const [moviesNowPlaying, setMoviesNowPlaying] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		async function getAllData() {
			Promise.all([
				getMoviePage(),
				getMoviesPop(),
				getTopMovies(),
				getPopularArtists(),
				getMoviesNowPlaying(),
			])
				.then(
					([
						moviePage,
						moviesPop,
						topMovies,
						popularArtists,
						moviesNowPlaying,
					]) => {
						setMovie(moviePage);
						setMoviesPop(moviesPop);
						setTopMovies(topMovies);
						setPopularArtists(popularArtists);
						setMoviesNowPlaying(moviesNowPlaying);
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
			{moviesPop && <Slider info={moviesPop} title={'Filmes Populares'} />}
			{topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
			{moviesNowPlaying && (
				<Slider info={moviesNowPlaying} title={'Filmes em Cartaz'} />
			)}
			{popularArtists && (
				<Slider info={popularArtists} title={'Top Artistas'} />
			)}
		</>
	);
}

export default Movies;
