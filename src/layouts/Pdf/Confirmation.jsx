import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import bgImage from '/pdfImg/ConfirmationSample.jpg';
// import bgImage from '/appImg/Logo.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    zIndex: -1, // Ensures the background is behind the text
  },
});

// Create Document Component
const Confirmation = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Background Image */}
      <Image src={bgImage} style={styles.background} />
    </Page>
  </Document>
);

export default Confirmation;
