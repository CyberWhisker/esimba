import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import bgImage from '/pdfImg/DeathImg.jpg';
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
    marginTop: 163,
    marginHorizontal: 220,
  },
  section2: {
    marginTop: 51,
    marginLeft: 200,
  },
  section3: {
    marginTop: 6,
    marginLeft: 170,
  },
  section4: {
    marginTop: 6,
    marginLeft: 130,
    display: 'flex',
    flexDirection: 'row'
  },
  section5: {
    marginTop: 6,
    marginLeft: 150,
  },
  section6: {
    marginTop: 7,
    marginLeft: 125,
    display: 'flex',
    flexDirection: 'row'
  },
  section7: {
    marginTop: 55,
    marginLeft: 250,
  },
  section8: {
    marginTop: 8,
    marginLeft: 190,
  },
  section9: {
    marginTop: 55,
    marginLeft: 380,
  },
  section10: {
    marginTop: 7,
    marginLeft: 330,
  },
  section11: {
    marginTop: 7,
    marginLeft: 310,
  },
  section12: {
    marginTop: 60,
    marginLeft: 320,
    display: 'flex',
    flexDirection: 'row'
  },
  purposeFont: {
    marginTop: 4,
    marginLeft: 150,
  },
  section13: {
    marginTop: 7,
    marginLeft: 170,
  },
  section14: {
    marginTop: 25,
    marginLeft: 300,
  }
});

// Create Document Component
const Death = () => (
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
        <Text>Address</Text>
      </View>
      <View style={styles.section4}>
        <Text>Mothers Name</Text>
        <Text style={{marginLeft: 70}}>Fathers Name</Text>
      </View>
      <View style={styles.section5}>
        <Text>Married to</Text>
      </View>
      <View style={styles.section6}>
        <Text>Died On</Text>
        <Text style={{marginLeft: 240}}>Date</Text>
      </View>
      <View style={styles.section7}>
        <Text>Rev Name</Text>
      </View>
      <View style={styles.section8}>
        <Text>Date</Text>
      </View>
      <View style={styles.section9}>
        <Text>Catholic Cem</Text>
      </View>
      <View style={styles.section10}>
      <Text>Municipal Cem</Text>
      </View>
      <View style={styles.section11}>
      <Text>Private Cem</Text>
      </View>
      <View style={styles.section12}>
        <Text>1</Text>
        <Text style={{marginLeft: 140}}>2</Text>
      </View>
      <View style={styles.section13}>
        <Text>Date Issued</Text>
      </View>
      <View style={styles.section14}>
        <Text>Parish Priest</Text>
      </View>
    </Page>
  </Document>
);

export default Death;
