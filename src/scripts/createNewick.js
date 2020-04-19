import TREE from '../json/ncov_tree';
export const createNewick = function() {
  // const newick = Newick.parse(
  // '((Yeast:1105.05915556,(((Spotted_Gar:314.68443368,Zebrafish:314.68443368):120.63' +
  //     '964094,(Chicken:311.90392136,(Cow:96.46238917,((Rat:20.88741740,Mouse:20.8874174' +
  //     '0):68.93577002,(Monkey:29.44154682,(Chimpanzee:6.65090500,Human:6.65090500):22.7' +
  //     '9064182):60.38164060):6.63920175):215.44153220):123.42015326):361.23157321,((Dro' +
  //     'sophila_melanogaster:743.00000000,C_elegans:743.00000000):10.00000000,Seahare:75' +
  //     '3.00000000):43.55564783):308.50350773):390.70474444,Arabidopsis:1495.76390000);');
  const newick = Newick.parse(TREE);
  var newickNodes = [];
  function buildNewickNodes(node, callback) {
    newickNodes.push(node);
    if (node.branchset) {
      for (var i = 0; i < node.branchset.length; i++) {
        buildNewickNodes(node.branchset[i]);
      }
    }
  }
  buildNewickNodes(newick);

  return newick;
}