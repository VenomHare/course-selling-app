import Link from 'next/link';
import styles from './../css/layout.module.css';

const Layout : React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <div className={styles.logo}>API Docs</div>
        <ul className={styles.navList}>
          <li><Link href="/">Overview</Link></li>
          <li><Link href="/getting-started">Getting Started</Link></li>
          <li><Link href="/authentication">Authentication</Link></li>
          <li><Link href="/endpoints">Endpoints</Link></li>
          <li><Link href="/error-handling">Error Handling</Link></li>
        </ul>
      </nav>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
export default Layout