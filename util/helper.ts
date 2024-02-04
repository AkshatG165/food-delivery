export function getDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return (
    date.toLocaleString().substring(0, 15) + date.toLocaleString().substring(18)
  );
}
