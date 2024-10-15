import { forwardRef, PropsWithChildren } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  id: string;
}

const Card = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <motion.div
        className={`${className} rounded-lg bg-white flex items-center justify-center shadow-lg`}
        ref={ref}
        style={{
          ...style,
        }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

export default Card;
