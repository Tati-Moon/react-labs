import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <p className={styles.header}>404 - Page Not Found</p>
      <p className={styles.description}>
        The page you are looking for does not exist.
      </p>
      <p className={styles.redirect}>
        You will be automatically redirected to the home page.
      </p>
      <div className={styles.pageNotFoundContainer}>
        <Image
          src="/icons/404.png"
          width={150}
          height={150}
          alt="404"
          priority
          className={styles.pageNotFoundImage}
        />
      </div>
      <Link href="/home" className={styles.linkGoHome}>
        Go to Home
      </Link>
    </div>
  );
}
