import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  children: string;
  delay?: number;
  stagger?: number;
  className?: string;
  as?: 'span' | 'div';
  wrapWord?: (word: string, i: number) => ReactNode;
};

export function StaggeredText({
  children,
  delay = 0,
  stagger = 0.07,
  className = '',
  wrapWord,
}: Props) {
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * stagger,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}
        >
          {wrapWord ? wrapWord(word, i) : word}
        </motion.span>
      ))}
    </span>
  );
}
