import styles from './Tabs.module.css';

export type TabItem = {
  id: string;
  label: string;
};

type Props = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export default function Tabs({ items, activeId, onChange }: Props) {
  return (
    <div className={styles.row}>
      {items.map((it) => {
        const active = it.id === activeId;
        return (
          <button
            key={it.id}
            className={`${styles.tab} ${active ? styles.active : ''}`}
            onClick={() => onChange(it.id)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
