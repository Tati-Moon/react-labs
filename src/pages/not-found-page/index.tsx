import image404 from '../../assets/icons/404.png';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>You will be automatically redirected to the home page.</p>
      <div className={styles.pageNotFoundContainer}>
        <img src={image404} alt="404" className={styles.pageNotFoundImage} />
      </div>
      <Link className={styles.linkGoHome} to="/">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
