import {Document, Paragraph, Packer, AlignmentType, UnderlineType} from 'docx';
import {saveAs} from 'file-saver';
import {Naskah} from '../interfaces/naskah';


const useDocx = () => {
    const downloadDocx = (naskah?: Naskah) => {
      const doc = new Document({
        styles: {
          paragraphStyles: [
              {
                id: "title",
                name: "title",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 24,
                  allCaps: true,
                },
                paragraph: {
                    alignment: AlignmentType.CENTER,
                    indent: {
                        left: 0,
                    },
                },
              }, 
              {
                id: "penulis",
                name: "penulis",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 24,
                  allCaps: false,
                },
                paragraph: {
                    alignment: AlignmentType.CENTER,
                    indent: {
                        left: 0,
                    },
                    spacing: {
                      after: 240
                    },
                },
              },               

              {
                id: "ACTION",
                name: "ACTION",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: true,
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 0,
                    },
                    spacing: {
                      before: 240
                    },
                },
              },   
              {
                id: "CAST",
                name: "CAST",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: true,
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 0,
                    },
                },
              },   
              {
                id: "CHARACTER",
                name: "CHARACTER",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: true,
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 3500,
                        right: 1500
                    },
                    spacing: {
                      before: 240
                    },
                },
              },   
              {
                id: "DIALOG",
                name: "DIALOG",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: false,
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 1500,
                        right: 1500
                    },
                },
              },   
              {
                id: "GENERAL",
                name: "GENERAL",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: true,
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 0,
                    },
                },
              },   
              {
                id: "HEADSCENE",
                name: "HEADSCENE",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: true,
                  underline: {
                    type: UnderlineType.SINGLE,
                    color: 'black',
                  }
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 0,
                    },
                },
              },   
              {
                id: "PARENTHETICAL",
                name: "PARENTHETICAL",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: false,
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 1500,
                    },
                },
              },   
              {
                id: "SHOT",
                name: "SHOT",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: true,
                },
                paragraph: {
                    alignment: AlignmentType.LEFT,
                    indent: {
                        left: 0,
                    },
                    spacing: {
                      before: 240,
                      after: 240
                    },

                },
              },   
              {
                id: "TRANSITION",
                name: "TRANSITION",
                basedOn: "Normal",
                next: "Normal",
                run: {
                  font: 'Courier New',
                  size: 21,
                  allCaps: true,
                },
                paragraph: {
                    alignment: AlignmentType.RIGHT,
                    indent: {
                        left: 0,
                    },
                    spacing: {
                      before: 240,
                      after: 240
                    },

                },
              },   
          ]
        }
      });
         
      let content: any = [];

      // JUDUL
      content.push(
        (new Paragraph({
          text: naskah?.judul,
          style: 'title'
        }))
      )
      // PRODUKSI
      content.push(
        (new Paragraph({
          text: `(${naskah?.produksi})`,
          style: 'title'
        }))
      )
      // PENULIS
      content.push(
        (new Paragraph({
          text: `By ${naskah?.penulis}`,
          style: 'penulis'
        }))
      )


      // CONTENT
      const naskahContent = naskah?.content;

      naskahContent?.map((n: any) => {
        content.push(
          (new Paragraph({
            text: n.text,
            style: n.elemen
          }))
        )
      })

      doc.addSection({
          properties: {},
          children: [
             ...content
          ],
      });

      Packer.toBlob(doc).then((blob: any) => {
          saveAs(blob, naskah?.judul+".docx");
      });

    }
    return {downloadDocx}
}

export default useDocx;