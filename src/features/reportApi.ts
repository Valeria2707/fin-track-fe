export const fetchDownloadReport = async (from: string, to: string): Promise<Blob> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/generate?from=${from}&to=${to}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }

  return await response.blob();
};
