import { useParams, useNavigate } from 'react-router-dom';
import { findProduct, products } from '../data/products';
import { getHistory, HistoryEntry } from '../data/content';
import PageHeader from '../components/PageHeader';
import StateTag from '../components/StateTag';
import styles from './History.module.css';

const columns: {
  label: string;
  width: string;
  render: (e: HistoryEntry) => React.ReactNode;
}[] = [
  { label: '이름', width: '250px', render: (e) => <span className={styles.cellText}>{e.version}</span> },
  { label: '버전', width: '150px', render: (e) => <span className={styles.cellText}>{e.version}</span> },
  { label: '상태', width: '150px', render: (e) => <StateTag status={e.status} /> },
  {
    label: '작성자',
    width: '150px',
    render: (e) => (
      <span className={styles.cellText}>
        <span className={styles.roleLabel}>{e.author.role}</span>
        <span>{e.author.name}</span>
      </span>
    ),
  },
  {
    label: '변경 내용',
    width: 'auto',
    render: (e) => <span className={styles.cellText}>{e.changes}</span>,
  },
  {
    label: '피그마 링크',
    width: '250px',
    render: (e) =>
      e.figmaUrl ? (
        <a href={e.figmaUrl} target="_blank" rel="noreferrer" className={styles.link}>
          paste URL
        </a>
      ) : (
        <span className={styles.cellText}>-</span>
      ),
  },
];

export default function History() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = findProduct(productId);
  const entries = productId ? getHistory(productId) : [];

  if (!product) return <div>제품을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbSelect={{
          options: products.map((p) => ({ label: p.shortTitle, value: p.id })),
          selected: product.shortTitle,
          onSelect: (id) => navigate(`/${id}/history`),
        }}
        title="History"
        description="문서 정보와 변경 이력을 보여줍니다."
      />
      <div className={styles.table}>
        <div className={styles.headRow}>
          {columns.map((col) => (
            <div
              key={col.label}
              className={styles.headCell}
              style={{ width: col.width, flex: col.width === 'auto' ? '1 0 0' : undefined }}
            >
              {col.label}
            </div>
          ))}
        </div>
        {entries.map((entry, idx) => (
          <div key={idx} className={styles.row}>
            {columns.map((col) => (
              <div
                key={col.label}
                className={styles.cell}
                style={{ width: col.width, flex: col.width === 'auto' ? '1 0 0' : undefined }}
              >
                {col.render(entry)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
