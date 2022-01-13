import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  media: {
    borderRadius: '20px',
    objectFit: 'contain',
    width: '100%',
    height: '100%',
    maxHeight: '550px',

  },
  card: {
    display: 'flex',
    width: '100%',
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
  },
  recommendedPosts: {
    display: 'flex',
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}));