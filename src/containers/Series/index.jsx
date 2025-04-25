import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { ModalSerie } from '../../components/Modal';
import Slider from '../../components/Slider';
import {
	getPopularSeries,
	getSeriePage,
	getSeries,
	getSeriesOnAir,
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

function Series() {
	const [showModal, setShowModal] = useState(false);
	const [seriePage, setSeriePage] = useState();
	const [serie, setSeries] = useState();
	const [topSeries, setTopSeries] = useState();
	const [popularSeries, setPopularSeries] = useState();
	const [seriesOnAir, setSeriesOnAir] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		async function getAllData() {
			Promise.all([
				getSeriePage(),
				getSeries(),
				getTopSeries(),
				getPopularSeries(),
				getSeriesOnAir(),
			])
				.then(([seriePage, series, topSeries, popularSeries, seriesOnAir]) => {
					setSeriePage(seriePage);
					setSeries(series);
					setTopSeries(topSeries);
					setPopularSeries(popularSeries);
					setSeriesOnAir(seriesOnAir);
				})
				.catch((error) => console.error(error));
		}
		getAllData();
	}, []);

	return (
		<>
			{seriePage && (
				<Background img={getImages(seriePage.backdrop_path)}>
					{showModal && (
						<ModalSerie serieId={seriePage.id} setShowModal={setShowModal} />
					)}
					<Container>
						<Info>
							<h1>{seriePage.title}</h1>
							<p>{seriePage.overview}</p>
							<ContainerButtons>
								<Button
									watch
									onClick={() => navigate(`/detalheserie/${seriePage.id}`)}
								>
									Assista Agora
								</Button>
								<Button onClick={() => setShowModal(true)}>
									Assista o Trailer
								</Button>
							</ContainerButtons>
						</Info>
						<Poster>
							<img alt="capa" src={getImages(seriePage.poster_path)} />
						</Poster>
					</Container>
				</Background>
			)}

			{topSeries && <Slider info={topSeries} title={'Top Séries'} />}
			{serie && <Slider info={serie} title={'Séries no Ar'} />}
			{popularSeries && (
				<Slider info={popularSeries} title={'Séries Populares'} />
			)}
			{seriesOnAir && <Slider info={seriesOnAir} title={'Séries Atuais'} />}
		</>
	);
}

export default Series;
