import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import bgImage from '/pdfImg/BaptismImg.png';
import moment from 'moment';
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

  churchFont: {
    marginTop: 250,
    marginHorizontal: 210,
  },
  nameFont: {
    marginTop: 20,
    marginLeft: 230,
  },
  motherFont: {
    marginTop: 4,
    marginLeft: 150,
  },
  fatherFont: {
    marginTop: 4,
    marginLeft: 120,
  },
  address: {
    marginTop: 4,
    marginLeft: 150,
  },
  birthBaptismDate: {
    marginTop: 4,
    marginLeft: 110,
    display: 'flex',
    flexDirection: 'row'
  },
  revFont: {
    marginTop: 72,
    marginLeft: 170,
  },
  sponsorsFont: {
    marginTop: 4,
    marginLeft: 205,
  },
  sponsorsFont2: {
    marginTop: 4,
    marginLeft: 110,
  },
  bookPageFont: {
    marginTop: 50,
    marginLeft: 360,
    display: 'flex',
    flexDirection: 'row'
  },
  lineFont: {
    marginTop: 3,
    marginLeft: 150,
  },
  issuedFont: {
    marginTop: 26,
    marginLeft: 180,
  },
  purposeFont: {
    marginTop: 4,
    marginLeft: 150,
  },
  priestFont: {
    marginTop: 15,
    marginLeft: 380,
  }
});

// Create Document Component
const Baptism = ({selected}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Background Image */}
        <Image src={bgImage} style={styles.background} />

        {/* Content Sections */}
        <View style={styles.churchFont}>
          <Text style={{fontWeight: 'bold'}}>Church Name awdawdawd</Text>
        </View>
        <View style={styles.nameFont}>
          <Text>{selected.name || ''}</Text>
        </View>
        <View style={styles.motherFont}>
          <Text>{selected.motherName || ''}</Text>
        </View>
        <View style={styles.fatherFont}>
          <Text>{selected.fatherName || ''}</Text>
        </View>
        <View style={styles.address}>
          <Text>{moment(selected.birthDate || '').format('MMMM DD YYYY')}</Text>
        </View>
        <View style={styles.birthBaptismDate}>
          <Text>{selected.birthAddress}</Text>
          <Text style={{marginLeft: 190}}>{moment(selected.baptismDate || '').format('MMMM DD YYYY')}</Text>
        </View>
        <View style={styles.revFont}>
          <Text>{selected.priest || ''}</Text>
        </View>
        <View style={styles.sponsorsFont}>
          <Text>{selected.sponsor1 || ''}</Text>
        </View>
        <View style={styles.sponsorsFont2}>
          <Text>{selected.sponsor2 || ''}</Text>
        </View>
        <View style={styles.bookPageFont}>
          <Text>1</Text>
          <Text style={{marginLeft: 110}}>1</Text>
        </View>
        <View style={styles.lineFont}>
          <Text>5</Text>
        </View>
        <View style={styles.issuedFont}>
          <Text>{moment().format('MMMM DD YYYY')}</Text>
        </View>
        <View style={styles.purposeFont}>
          <Text>{selected.purpose || ''}</Text>
        </View>
        <View style={styles.priestFont}>
          <Text>{selected.priest || ''}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default Baptism;
