export default function PDFViewer({ src }) {
  return <embed src={src} type="application/pdf" width="100%" height="100%" />;
}
