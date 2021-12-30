
import useStyles from './styles';

const Ad = ({data}) => {

  const classes = useStyles();

  return(
    <>
      <h1>{data.title}</h1>
      <h2>{data.car.make}</h2>
      <h2>{data.car.model}</h2>
      <p>{data.description}</p>
    </>
  );
}

export default Ad;