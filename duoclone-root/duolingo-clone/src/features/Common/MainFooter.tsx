import { Footer } from "../../components/molecules/Footer/Footer";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { MainNavigationButtons } from "./MainNavigationButtons";

export function MainFooter() {

  const {data: currentUser} = useCurrentUser();

  return (
    <Footer padding="px-6" height="h-20 border-t border-t-duoGrayBorder">
      <div className="w-full flex items-center justify-between">
        <MainNavigationButtons currentUser={currentUser}/>
      </div>
    </Footer>
  );
}
