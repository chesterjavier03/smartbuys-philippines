import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import BackButton from './back-button';
import Socials from './socials';

type CardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocials?: boolean;
};

const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,
  showSocials,
}: CardWrapperProps) => {
  return (
    <div className="flex justify-center items-center pt-10">
      <Card className="flex flex-col lg:w-1/2 md:w-full w-full shadow-2xl shadow-black/30">
        <CardHeader>{cardTitle}</CardHeader>
        <CardContent>{children}</CardContent>
        {/* {showSocials && (
          <CardFooter>
            <Socials />
          </CardFooter>
        )} */}
        <CardFooter>
          <BackButton href={backButtonHref} label={backButtonLabel} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthCard;
