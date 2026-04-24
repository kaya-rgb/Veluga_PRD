import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.root}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
