import { handleError } from '@/helpers/handleError';
import { Button } from '../ui/button';
import { fetchDownloadReport } from '@/features/reportApi';

type Props = {
  from: string;
  to: string;
};

const ReportButton: React.FC<Props> = ({ from, to }) => {
  const handleDownloadReport = async () => {
    try {
      const blob = await fetchDownloadReport(from, to);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${from}-to-${to}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleError(error);
    }
  };
  return <Button onClick={handleDownloadReport}>Download Report</Button>;
};

export default ReportButton;
