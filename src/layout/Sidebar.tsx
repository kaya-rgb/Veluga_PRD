import { Link, NavLink } from 'react-router-dom';
import { useSelectedProduct } from '../context/ProductContext';
import logoUrl from '../assets/logo.svg';
import styles from './Sidebar.module.css';

type MenuItem = {
  label: string;
  to: (productId: string) => string;
  match: (path: string) => boolean;
  disabled?: boolean;
};

const menu: MenuItem[] = [
  {
    label: 'Home',
    to: () => '/',
    match: (p) => p === '/',
  },
  {
    label: 'History',
    to: (id) => `/${id}/history`,
    match: (p) => p.endsWith('/history'),
  },
  {
    label: 'Overview',
    to: (id) => `/${id}/overview`,
    match: (p) => p.endsWith('/overview'),
  },
  {
    label: 'Screen Spec',
    to: (id) => `/${id}/screen-spec`,
    match: (p) => p.endsWith('/screen-spec'),
  },
  { label: 'Policy', to: () => '#', match: () => false, disabled: true },
  { label: 'Open Issue', to: () => '#', match: () => false, disabled: true },
];

export default function Sidebar() {
  const { selectedId } = useSelectedProduct();

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.logoLink} aria-label="Home">
        <img src={logoUrl} alt="Veluga" className={styles.logo} />
      </Link>
      <nav className={styles.menu}>
        {menu.map((item) => {
          if (item.disabled) {
            return (
              <span key={item.label} className={`${styles.item} ${styles.disabled}`}>
                {item.label}
              </span>
            );
          }
          return (
            <NavLink
              key={item.label}
              to={item.to(selectedId)}
              end={item.label === 'Home'}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
