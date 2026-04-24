import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { findProduct } from '../data/products';
import { getScreenSpec, ScreenSection } from '../data/content';
import PageHeader from '../components/PageHeader';
import Tabs from '../components/Tabs';
import styles from './ScreenSpec.module.css';

type Platform = 'desktop' | 'mobile';

function Section({ section, defaultOpen }: { section: ScreenSection; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.section} data-open={open}>
      <button
        className={styles.sectionHead}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={styles.sectionTitle}>{section.title}</span>
        <svg
          className={`${styles.caret} ${open ? styles.caretOpen : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#1b1c1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          <div className={styles.frame}>
            {section.iframeUrl ? (
              <iframe
                src={section.iframeUrl}
                title={section.title}
                className={styles.iframe}
                loading="lazy"
              />
            ) : (
              <div className={styles.iframePlaceholder}>
                <p>이미지 iframe URL이 설정되지 않았습니다.</p>
                <code>screen-spec.json → iframeUrl</code>
              </div>
            )}
          </div>
          <aside className={styles.desc}>
            <p className={styles.descLabel}>Description</p>
            <div className={styles.descBody}>
              <p className={styles.descTitle}>{section.description.title}</p>
              <div className={styles.descText}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {section.description.body}
                </ReactMarkdown>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default function ScreenSpec() {
  const { productId } = useParams<{ productId: string }>();
  const product = findProduct(productId);
  const [platform, setPlatform] = useState<Platform>('desktop');

  const spec = useMemo(
    () => (productId ? getScreenSpec(productId) : { desktop: [], mobile: [] }),
    [productId]
  );

  if (!product) return <div>제품을 찾을 수 없습니다.</div>;

  const sections = spec[platform];

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumb={product.shortTitle}
        title="Screen Spec"
        description="화면별 구성 요소와 설명을 정의합니다."
      />
      <div className={styles.body}>
        <Tabs
          items={[
            { id: 'desktop', label: 'Desktop' },
            { id: 'mobile', label: 'Mobile' },
          ]}
          activeId={platform}
          onChange={(id) => setPlatform(id as Platform)}
        />
        <div className={styles.sections}>
          {sections.length === 0 ? (
            <p className={styles.empty}>
              {platform === 'desktop' ? 'Desktop' : 'Mobile'} 화면 정의가 아직 없습니다.
            </p>
          ) : (
            sections.map((s, i) => (
              <Section key={`${platform}-${s.id}`} section={s} defaultOpen={i === 0} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
