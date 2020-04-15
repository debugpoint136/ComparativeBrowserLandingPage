const GENOMES = [
  {
    name: 'Cow',
    key: 'bosTau8',
    query: [
      {
        Mouse: 'mm10'
      }
    ],
    url: 'https://vizhub.wustl.edu/public/bosTau8/Cow.png'
  }, {
    name: 'Zebrafish',
    key: 'danRer11',
    query: [
      {
        'Spotted_Gar': 'lepOcu1'
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Zebrafish.png'
  }, {
    name: 'Human',
    key: 'hg19',
    query: [
      {
        Mouse: ['mm9' , 'mm10']
      }, {
        Rat: ['rn4', 'rn5']
      }, {
        Rhesus: 'rheMac3'
      }, {
        Zebrafish: 'danRer7'
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Human.png'
  }, {
    name: 'Human',
    key: 'hg38',
    query: [
      {
        Mouse: 'mm10'
      }, {
        Rat: ['rn4', 'rn5']
      }, {
        Rhesus: 'rheMac3'
      }, {
        Chimp: 'panTro5'
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Human.png'
  }, {
    name: 'Mouse',
    key: 'mm10',
    query: [
      {
        Human: ['hg19', 'hg38']
      }, {
        Rat: ['rn4', 'rn5']
      }, {
        Rhesus: 'rheMac3'
      }, {
        Arabidopsis: 'danRer7'
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Mouse.png'
  }, {
    name: 'Mouse',
    key: 'mm9',
    query: [
      {
        Human: ['hg19', 'hg38']
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Mouse.png'
  }, {
    name: 'Chimp',
    key: 'panTro5',
    query: [
      {
        Human: 'hg38'
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Chimp.png'
  }
]