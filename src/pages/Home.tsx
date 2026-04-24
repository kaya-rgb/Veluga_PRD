import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useSelectedProduct } from '../context/ProductContext';
import PageHeader from '../components/PageHeader';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  const { setSelectedId } = useSelectedProduct();

  const go = (id: string) => {
    setSelectedId(id);
    navigate(`/${id}/overview`);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Home"
        description="원하는 기획서의 섹션을 선택하면 해당 메뉴의 기획서 내용이 노출됩니다."
      />
      <div className={styles.grid}>
        {products.map((p) => (
          <button key={p.id} className={styles.card} onClick={() => go(p.id)}>
            <div className={styles.cardTop}>
              <p className={styles.updated}>{p.updated} 업데이트 됨</p>
              <div className={styles.cardTitle}>{p.title}</div>
              <p className={styles.cardDesc}>{p.description}</p>
            </div>
            <span className={styles.arrow} aria-hidden>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#1b1c1e" />
                <path
                  d="M21 16l8 8-8 8"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
