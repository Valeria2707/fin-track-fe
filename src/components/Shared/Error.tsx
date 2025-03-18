import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type Props = {
  text: string;
};

const Error: React.FC<Props> = ({ text }) => {
  return (
    <Alert variant="destructive" className="max-w-md mt-10 ml-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

export default Error;
