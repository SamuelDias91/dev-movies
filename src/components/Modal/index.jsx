import { useEffect, useState } from 'react';

import { getMovieVideos, getSerieVideos } from '../../services/getData';
import { Background, CloseButton, Container } from './styles';

export function Modal({ movieId, setShowModal }) {
	const [movie, setMovie] = useState();

	useEffect(() => {
		async function getMovies() {
			setMovie(await getMovieVideos(movieId));
		}
		getMovies();
	}, []);

	return (
		<Background onClick={() => setShowModal(false)}>
			{movie && (
				<Container>
					<CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
					<iframe
						src={`https://www.youtube.com/embed/${movie[0].key}`}
						title="YouTube Video Player"
						height="500px"
						width="100%"
					></iframe>
				</Container>
			)}
		</Background>
	);
}

export function ModalSerie({ serieId, setShowModal }) {
	const [serie, setSerie] = useState();

	useEffect(() => {
		async function getSerie() {
			setSerie(await getSerieVideos(serieId));
		}
		getSerie();
	}, []);

	return (
		<Background onClick={() => setShowModal(false)}>
			{serie && (
				<Container>
					<CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
					<iframe
						src={`https://www.youtube.com/embed/${serie[0].key}`}
						title="YouTube Video Player"
						height="500px"
						width="100%"
					></iframe>
				</Container>
			)}
		</Background>
	);
}
