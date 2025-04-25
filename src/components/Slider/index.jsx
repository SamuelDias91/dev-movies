import Card from '../Card/index.jsx';
import { Container } from './styles.js';

import { Swiper, SwiperSlide } from 'swiper/react';

function Slider({ info, title }) {
	return (
		<Container>
			<h2>{title}</h2>
			<Swiper
				grabCursor
				spaceBetween={15}
				slidesPerView={'auto'}
				className="swiper"
			>
				{info.map((item, index) => (
					<SwiperSlide key={index}>
						<Card item={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</Container>
	);
}

export default Slider;
