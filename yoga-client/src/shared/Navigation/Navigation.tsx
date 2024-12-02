import { useSelector } from "react-redux";
import { NAVIGATION_DEMO_2 } from "../../data/navigation";
import NavigationItem from "./NavigationItem";
import { RootState } from "../../context/store";

export default function Navigation() {
  const { data } = useSelector((state: RootState) => state.order);
  return (
    <ul className="nc-Navigation flex items-center">
      {NAVIGATION_DEMO_2.filter((item) => {
        if (item.name == "My Order" && data) {
          return true;
        } else {
          return item.name != "My Order";
        }
      }).map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}
