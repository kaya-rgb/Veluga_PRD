import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { findProduct, products } from '../data/products';
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
            <div className={styles.descLabelRow}>
              <p className={styles.descLabel}>Description</p>
              <span className={styles.infoWrap}>
                <span className={styles.infoIcon}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" />
                    <rect x="6.5" y="6" width="1" height="4.5" rx="0.5" fill="currentColor" />
                    <circle cx="7" cy="4" r="0.75" fill="currentColor" />
                  </svg>
                </span>
              </span>
              <span className={styles.tooltip}>화면의 숫자를 클릭하면 해당 기능의{'\n'}설명이 Description에 노출됩니다.</span>
            </div>
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
  const navigate = useNavigate();
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
        breadcrumbSelect={{
          options: products.map((p) => ({ label: p.shortTitle, value: p.id })),
          selected: product.shortTitle,
          onSelect: (id) => navigate(`/${id}/screen-spec`),
        }}
        title="Screen Spec"
        description="화면 설계와 기능 정의를 확인할 수 있습니다."
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
