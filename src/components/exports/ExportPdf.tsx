import React from 'react';
import { Page, Text, Font, View, Document, StyleSheet } from '@react-pdf/renderer';
import {Naskah} from '../../interfaces/naskah';
import CourierNew from '../../fonts/CourierNew.ttf';

Font.register({family: 'Courier New', src: CourierNew})

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
    paddingTop: '4cm',
    paddingLeft: '4cm',
    paddingBottom: '3cm',
    paddingRight: '3cm',
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Courier New',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  penulis: {
    fontSize: 14,
    fontFamily: 'Courier New',
    textAlign: 'center',
  },
  default: {
    margin: 0,
    fontSize: 12,
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Courier New'
  },
  action: {
    margin: 0,
    fontSize: 12,
    width: '100%',
    minHeight: 4,
    textAlign: "left",
    fontFamily: 'Courier New',
    marginBottom: 4,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  cast: {
    margin: 0,
    fontSize: 12,
    width: '100%',
    textAlign: "left",
    fontFamily: 'Courier New',
    marginBottom: 8
  },
  character: {
    margin: 0,
    marginTop: 8,
    fontSize: 12,
    width: '100%',
    textTransform: 'uppercase',
    fontFamily: 'Courier New',
    paddingLeft: '15%',
    paddingRight: '10%',
    textAlign: 'center'
  },
  dialog: {
    margin: 0,
    fontSize: 12,
    width: '100%',
    minHeight: 4,
    textAlign: 'left',
    fontFamily: 'Courier New',
    paddingLeft: '15%',
    paddingRight: '10%',
  },
  general: {
    margin: 0,
    fontSize: 12,
    width: '100%',
    minHeight: 4,
    textAlign: "left",
    textTransform: 'uppercase',
    fontFamily: 'Courier New',
    marginBottom: 4,
    marginTop: 4,
  },
  headscene: {
    margin: 0,
    fontSize: 12,
    width: '100%',
    textAlign: "left",
    textTransform: 'uppercase',
    fontFamily: 'Courier New',
    textDecoration: 'underline',
  },
  parenthetical: {
    margin: 0,
    fontSize: 12,
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Courier New',
    paddingLeft: '15%',
  },
  shot: {
    margin: 0,
    fontSize: 12,
    marginTop: 1,
    width: '100%',
    textAlign: "left",
    textTransform: 'uppercase',
    fontFamily: 'Courier New'
  },
  transition: {
    margin: 0,
    marginBottom: 4,
    marginTop: 4,
    fontSize: 12,
    width: '100%',
    textAlign: "right",
    textTransform: 'uppercase',
    fontFamily: 'Courier New',
  },
});

interface Props {
  naskah?: Naskah;
}
// Create Document Component
const ExportPdf = (props: Props) => {
  const {naskah} = props;
  return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{naskah?.judul}</Text>
            <Text style={styles.title}>({naskah?.produksi})</Text>
            <Text style={styles.penulis}>By {naskah?.penulis}</Text>
          </View>
          {naskah?.content?.map((n,k) => {
            return (
              <Text key={k} style={        
                (n?.elemen === 'ACTION') ? styles.action : 
                (n?.elemen === 'CAST') ? styles.cast :
                (n?.elemen === 'CHARACTER') ? styles.character :
                (n?.elemen === 'DIALOG') ? styles.dialog :
                (n?.elemen === 'GENERAL') ? styles.general :
                (n?.elemen === 'HEADSCENE') ? styles.headscene :
                (n?.elemen === 'PARENTHETICAL') ? styles.parenthetical :
                (n?.elemen === 'SHOT') ? styles.shot :
                (n?.elemen === 'TRANSITION') ? styles.transition :
                styles.default
              }>{n.text}</Text>
            )
          })}
        </Page>
      </Document>
  )
};

export default ExportPdf