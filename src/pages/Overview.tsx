import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { findProduct, products } from '../data/products';
import { getOverviewMarkdown, getOverviewVersions } from '../data/content';
import PageHeader from '../components/PageHeader';
import Tabs from '../components/Tabs';
import styles from './Overview.module.css';

export default function Overview() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = findProduct(productId);

  const versions = useMemo(
    () => (productId ? getOverviewVersions(productId) : []),
    [productId]
  );
  const [activeVersion, setActiveVersion] = useState<string>(
    () => versions[0] ?? ''
  );

  if (!product) return <div>제품을 찾을 수 없습니다.</div>;

  const markdown = productId ? getOverviewMarkdown(productId, activeVersion) : '';

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbSelect={{
          options: products.map((p) => ({ label: p.shortTitle, value: p.id })),
          selected: product.shortTitle,
          onSelect: (id) => navigate(`/${id}/overview`),
        }}
        title="Overview"
        description="프로젝트의 배경, 목표, 범위를 정의합니다."
      />
      <div className={styles.body}>
        {versions.length > 0 && (
          <Tabs
            items={versions.map((v) => ({ id: v, label: v }))}
            activeId={activeVersion}
            onChange={setActiveVersion}
          />
        )}
        <div className={styles.markdown}>
          {markdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          ) : (
            <p className={styles.empty}>이 버전의 Overview 내용이 아직 작성되지 않았습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
