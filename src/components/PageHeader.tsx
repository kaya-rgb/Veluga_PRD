import styles from './PageHeader.module.css';

type Props = {
  breadcrumb?: string;
  title: string;
  description: string;
};

export default function PageHeader({ breadcrumb, title, description }: Props) {
  return (
    <header className={styles.header}>
      {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}
