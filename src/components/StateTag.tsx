import styles from './StateTag.module.css';

type Props = {
  status: 'draft' | 'in_review' | 'confirmed';
};

const label: Record<Props['status'], string> = {
  draft: 'Draft',
  in_review: 'In Review',
  confirmed: 'Confirmed',
};

export default function StateTag({ status }: Props) {
  return <span className={`${styles.tag} ${styles[status]}`}>{label[status]}</span>;
}
