export const GENOMES = [
  {
    name: 'Cow',
    key: 'bosTau8',
    query: [
      {
        species: 'Mouse',
        assembly_list: ['mm10']
      }
    ],
    url: 'https://vizhub.wustl.edu/public/bosTau8/Cow.png'
  }, {
    name: 'Zebrafish',
    key: 'danRer11',
    query: [
      {
        species: 'Spotted_Gar',
        assembly_list: ['lepOcu1']
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Zebrafish.png'
  }, {
    name: 'Human',
    key: 'hg19',
    query: [
      {
        species: 'Mouse',
        assembly_list: ['mm9' , 'mm10']
      }, {
        species: 'Rat',
        assembly_list: ['rn4', 'rn5']
      }, {
        species: 'Monkey', 
        assembly_list: ['rheMac3']
      }, {
        species: 'Zebrafish',
        assembly_list: ['danRer7']
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Human.png'
  }, {
    name: 'Human',
    key: 'hg38',
    query: [
      {
        species: 'Mouse',
        assembly_list: ['mm10']
      }, {
        species: 'Rat',
        assembly_list: ['rn4', 'rn5']
      }, {
        species: 'Monkey',
        assembly_list: ['rheMac3']
      }, {
        species: 'Chimp',
        assembly_list: ['panTro5']
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Human.png'
  }, {
    name: 'Mouse',
    key: 'mm10',
    query: [
      {
        species: 'Human',
        assembly_list: ['hg19', 'hg38']
      }, {
        species: 'Rat',
        assembly_list: ['rn4', 'rn5']
      }, {
        species: 'Monkey',
        assembly_list: ['rheMac3']
      }, {
        species: 'Arabidopsis',
        assembly_list: ['danRer7']
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Mouse.png'
  }, {
    name: 'Mouse',
    key: 'mm9',
    query: [
      {
        species: 'Human',
        assembly_list: ['hg19', 'hg38']
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Mouse.png'
  }, {
    name: 'Chimp',
    key: 'panTro5',
    query: [
      {
        species: 'Human',
        assembly_list: ['hg38']
      }
    ],
    url: 'https://epigenomegateway.wustl.edu/browser/images/Chimp.png'
  }
]