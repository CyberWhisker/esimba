import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import bgImage from '/pdfImg/ConfirmationImg.png';
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
    marginTop: 95,
    marginHorizontal: 210,
  },
  section2: {
    marginTop: 165,
    marginLeft: 230,
  },
  section3: {
    marginTop: 4,
    marginLeft: 150,
    display: 'flex',
    flexDirection: 'row'
  },
  section4: {
    marginTop: 4,
    marginLeft: 180,
  },
  section5: {
    marginTop: 4,
    marginLeft: 100,
  },
  section6: {
    marginTop: 105,
    marginLeft: 105,
    display: 'flex',
    flexDirection: 'row'
  },
  section7: {
    marginTop: 4,
    marginLeft: 240,
  },
  section8: {
    marginTop: 55,
    marginLeft: 360,
    display: 'flex',
    flexDirection: 'row'
  },
  section9: {
    marginTop: 3,
    marginLeft: 150,
  },
  section10: {
    marginTop: 26,
    marginLeft: 200,
  },
  section11: {
    marginTop: 50,
    marginLeft: 350,
  }
});

// Create Document Component
const Confirmation = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Background Image */}
      <Image src={bgImage} style={styles.background} />

      {/* Content Sections */}
      <View style={styles.section1}>
        <Text style={{fontWeight: 'bold'}}>Church Name awdawdawd</Text>
      </View>
      <View style={styles.section2}>
        <Text>First Name Last Name</Text>
      </View>
      <View style={styles.section3}>
        <Text>Mother Name</Text>
        <Text style={{marginLeft: 105}}>Father Name</Text>
      </View>
      <View style={styles.section4}>
        <Text>Baptism Date</Text>
      </View>
      <View style={styles.section5}>
        <Text>Church Name </Text>
      </View>
      <View style={styles.section6}>
        <Text>Rev Name</Text>
        <Text style={{marginLeft: 170}}>Confirmed</Text>
      </View>
      <View style={styles.section7}>
        <Text>Sponsors Name</Text>
      </View>
      <View style={styles.section8}>
        <Text>1</Text>
        <Text style={{marginLeft: 120}}>1</Text>
      </View>
      <View style={styles.section9}>
        <Text>5</Text>
      </View>
      <View style={styles.section10}>
        <Text>Date</Text>
      </View>
      <View style={styles.section11}>
        <Text>Priest Name</Text>
      </View>
    </Page>
  </Document>
);

export default Confirmation;
