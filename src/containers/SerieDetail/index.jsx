import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Credits from '../../components/Credits';
import Slider from '../../components/Slider';
import SpanGenres from '../../components/SpanGenres';
import {
	getSerieById,
	getSerieCredits,
	getSerieSimilar,
	getSerieVideos,
} from '../../services/getData';
import { getImages } from '../../utils/getImages';
import { Background, Container, ContainerSeries, Cover, Info } from './styles';

function SerieDetail() {
	const { id } = useParams();
	const [serie, setSerie] = useState();
	const [serieVideos, setSerieVideos] = useState();
	const [serieCredits, setSerieCredits] = useState();
	const [serieSimilar, setSerieSimilar] = useState();

	useEffect(() => {
		async function getAllData() {
			Promise.all([
				getSerieById(id),
				getSerieVideos(id),
				getSerieCredits(id),
				getSerieSimilar(id),
			])
				.then(([serie, videos, credits, similar]) => {
					setSerie(serie);
					setSerieVideos(videos);
					setSerieCredits(credits);
					setSerieSimilar(similar);
				})
				.catch((error) => console.error(error));
		}
		getAllData();
	}, []);

	return (
		<>
			{serie && (
				<>
					<Background image={getImages(serie.backdrop_path)} />
					<Container>
						<Cover>
							<img src={getImages(serie.poster_path)} alt="poster-serie" />
						</Cover>
						<Info>
							<h2>{serie.title}</h2>
							<SpanGenres genres={serie.genres} />
							<p>{serie.overview}</p>
							<Credits credits={serieCredits} />
						</Info>
					</Container>
					<ContainerSeries>
						{serieVideos &&
							serieVideos.map((video) => (
								<div key={video.id}>
									<h4>{video.name}</h4>
									<iframe
										src={`https://www.youtube.com/embed/${video.key}`}
										title="YouTube Video Player"
										height="500px"
										width="100%"
									></iframe>
								</div>
							))}
					</ContainerSeries>
					{serieSimilar && (
						<Slider info={serieSimilar} title={'Séries Similares'} />
					)}
				</>
			)}
		</>
	);
}

export default SerieDetail;
