import { useEffect } from "react";
import LowStock from "../components/home/lowStock";

const Home = (props) => {
  const { alcohols, mixers, setLoading } = props;
  useEffect(() => {
    setLoading(false);
  }, [alcohols, mixers]);

  return <>{<LowStock alcohols={alcohols} mixers={mixers} />}</>;
};

export default Home;
