import { motion } from "framer-motion";

interface TextAnimatorProps {
  text: string;
  space?: number;
  classname?: string;
  fromDown?: boolean;
}

export const TextAnimator: React.FC<TextAnimatorProps> = ({
  text,
  space,
  classname,
  fromDown,
}) => {
  const wordArray = text.split(" ");
  let letterCount = 0;
  return (
    <div className={`flex flex-row flex-wrap w-fit ${classname}  `}>
      {wordArray.map((word, wordIndex) => {
        return (
          <div
            key={wordIndex}
            style={{ marginRight: space }}
            className="flex flex-row"
          >
            {word.split("").map((letter, letterIndex) => {
              letterCount++;
              return (
                <motion.h1
                  key={letterIndex}
                  className=""
                  initial={{ opacity: 0, y: fromDown ? 30 : -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: 0.05 * letterCount }}
                >
                  {letter}
                </motion.h1>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
