import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import bgImage from '/pdfImg/MarriageImg.png';
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

  section1: {
    marginTop: 264,
    marginHorizontal: 110,
    display: 'flex',
    flexDirection: 'row'
  },
  section2: {
    marginLeft: 110,
  },
  section3: {
    marginLeft: 110,
  },
  section4: {
    marginLeft: 110,
  },
  section5: {
    marginLeft: 110,
  },
  birthBaptismDate: {
    marginTop: 4,
    marginLeft: 110,
    display: 'flex',
    flexDirection: 'row'
  },
  section6: {
    marginTop: 55,
    marginLeft: 110,
  },
  section7: {
    marginTop: 76,
    marginLeft: 110,
  },
  section8: {
    marginTop: 40,
    marginLeft: 110,
    display: 'flex',
    flexDirection: 'row'
  },
  section9: {
    marginTop: 56,
    marginLeft: 190,
  },
  section10: {
    marginLeft: 110,
  },
  section11: {
    marginLeft: 110,
  },
  section12: {
    marginTop: 13,
    marginLeft: 210,
  },
});

// Create Document Component
const Marriage = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Background Image */}
      <Image src={bgImage} style={styles.background} />

      {/* Content Sections */}
      <View style={styles.section1}>
        <Text>User Name</Text>
        <Text style={{marginLeft: 150}}>User Name</Text>
      </View>
      <View style={styles.section2}>
        <Text>Age</Text>
      </View>
      <View style={styles.section3}>
        <Text>Status</Text>
      </View>
      <View style={styles.section4}>
        <Text>Father Name</Text>
      </View>
      <View style={styles.section5}>
      <Text>Mother Name</Text>
      </View>
      <View style={styles.section6}>
        <Text>Rev Name</Text>
      </View>
      <View style={styles.section7}>
        <Text>Church Name</Text>
      </View>
      <View style={styles.section8}>
        <Text>Witness 1</Text>
        <Text style={{marginLeft: 130}}>Witness 2</Text>
      </View>
      <View style={styles.section9}>
        <Text>Certfied</Text>
      </View>
      <View style={styles.section10}>
        <Text>Date</Text>
      </View>
      <View style={styles.section11}>
        <Text>Book 1</Text>
        <Text>Page 1</Text>
        <Text>Line 1</Text>
      </View>
      <View style={styles.section12}>
        <Text>Parochial Vicar</Text>
      </View>
    </Page>
  </Document>
);

export default Marriage;
