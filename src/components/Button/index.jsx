import { ButtonTrailer, ButtonWatch } from './styles';

function Button({ children, watch, ...rest }) {
	return (
		<>
			{watch ? (
				<ButtonWatch {...rest}>{children}</ButtonWatch>
			) : (
				<ButtonTrailer {...rest}>{children}</ButtonTrailer>
			)}
		</>
	);
}

export default Button;
