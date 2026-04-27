import { useState, useEffect, useRef } from 'react';
import styles from './PageHeader.module.css';

type SelectOption = { label: string; value: string };

type Props = {
  breadcrumb?: string;
  breadcrumbSelect?: {
    options: SelectOption[];
    selected: string;
    onSelect: (value: string) => void;
  };
  title: string;
  description: string;
};

export default function PageHeader({ breadcrumb, breadcrumbSelect, title, description }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <header className={styles.header}>
      {breadcrumbSelect ? (
        <div className={styles.selectBox} ref={ref}>
          <button className={styles.selectButton} onClick={() => setOpen((v) => !v)}>
            <span>{breadcrumbSelect.selected}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s' }}>
              <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
            </svg>
          </button>
          {open && (
            <ul className={styles.dropdown}>
              {breadcrumbSelect.options.map((opt) => (
                <li
                  key={opt.value}
                  className={`${styles.dropdownItem} ${opt.label === breadcrumbSelect.selected ? styles.dropdownItemActive : ''}`}
                  onClick={() => { breadcrumbSelect.onSelect(opt.value); setOpen(false); }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : breadcrumb ? (
        <p className={styles.breadcrumb}>{breadcrumb}</p>
      ) : null}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}
