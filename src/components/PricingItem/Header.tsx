import type { FC } from "react";

const PricingItemHeader: FC = ({ children }) => {
  return (
    <div className="heading">
      <h3>{children}</h3>
    </div>
  );
};

export default PricingItemHeader;
