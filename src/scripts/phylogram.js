import {GENOMES} from './genomes_compatibility';

/**
 * setSourceOptions, setTargetOptions, setSourceChecked, setTargetChecked
 *    sourceOptions: [],
      targetOptions: [],
      sourceChecked: '',
      targetChecked: '',
      selection: []
 */

export default class Phylogram {
  constructor(selector, nodes, options, state) {
    this.selector = selector;
    this.nodes = nodes;
    this.options = options;
    this.state_methods = state.methods;
    this.state_data = state.data;
  }

  checkIfAssemblyinSpecies(species, assembly) {
    return GENOMES
      .filter(d => d.key === assembly && d.name === species)
      .length > 0;
  }

  getTargetSpeciesCandidates(species, assembly) {
    const entry = GENOMES.filter(d => d.key === assembly);
    if (entry.length > 0) {
      return entry[0]
        .query
        .map(d => d.species);
    } else {
      return null;
    }
  }

  rightAngleDiagonal() {
    var projection = function (d) {
      return [d.y, d.x];
    }

    var path = function (pathData) {
      return "M" + pathData[0] + ' ' + pathData[1] + " " + pathData[2];
    }

    function diagonal(diagonalPath, i) {
      var source = diagonalPath.source,
        target = diagonalPath.target,
        midpointX = (source.x + target.x) / 2,
        midpointY = (source.y + target.y) / 2,
        pathData = [
          source, {
            x: target.x,
            y: source.y
          },
          target
        ];
      pathData = pathData.map(projection);
      return path(pathData)
    }

    diagonal.projection = function (x) {
      if (!arguments.length) 
        return projection;
      projection = x;
      return diagonal;
    };

    diagonal.path = function (x) {
      if (!arguments.length) 
        return path;
      path = x;
      return diagonal;
    };

    return diagonal;
  }

  styleTreeNodes(vis) {
    const {setSourceOptions} = this.state_methods;
    const {sourceChecked} = this.state_data;
    const getTargetSpeciesCandidates = this.getTargetSpeciesCandidates;
    const checkIfAssemblyinSpecies = this.checkIfAssemblyinSpecies;

    const leafnode = vis
      .selectAll('g.leaf.node')
      .append("svg:circle")
      .attr('id', (d) => {
        return d.name;
      })

    leafnode.attr("r", (d) => {
      if (checkIfAssemblyinSpecies(d.name, sourceChecked)) {
        return 10;
      } else {
          return 5;
        }
      })
      .attr('stroke', 'yellowGreen')
      .attr('fill', (d) => {;
        if (sourceChecked !== '') {
          if (getTargetSpeciesCandidates(d.name, sourceChecked).indexOf(d.name) > -1) {
            return 'greenYellow';
          } else {
            return 'grey';
          }
        } else {
          return 'greenYellow';
        }

      })
      .attr('stroke-width', (d) => {
        if (checkIfAssemblyinSpecies(d.name, sourceChecked)) {
          return '4px';
        } else {
          return '2px';
        }
      })

    leafnode.on("mouseover", function (d) {
      if (sourceChecked !== '') {
        if (getTargetSpeciesCandidates(d.name, sourceChecked).indexOf(d.name) > -1) {
          d3
            .select(this)
            .attr({
              fill: "orange",
              r: 5 * 2
            });
        }
      } else {
        d3
          .select(this)
          .attr({
            fill: "lightBlue",
            r: 5 * 2
          });
        }
      })
      .on("mouseout", function (d) {
        if (sourceChecked !== '') {
          if (getTargetSpeciesCandidates(d.name, sourceChecked).indexOf(d.name) > -1) {
            d3
              .select(this)
              .attr({fill: "greenYellow", r: 5});
          }
        } else {
          d3
            .select(this)
            .attr({fill: "greenYellow", r: 5});
        }
      })
      .on("click", function (d) {
        d3
          .select(this)
          .attr('r', 20)
          .style("fill", "lightcoral")
          .style("stroke", "red")
          .transition()
          .duration(750);
        const genome_name = d3
          .select(this)
          .attr('id');
        const items = GENOMES.filter(d => d.name === genome_name);
        if (items.length > 0) {
          const options = items.map(d => d.key);
          setSourceOptions(options);
        }
      });

    vis
      .selectAll('g.root.node')
      .append('svg:circle')
      .attr("r", 5)
      .attr('fill', 'steelblue')
      .attr('stroke', '#369')
      .attr('stroke-width', '2px');
  }

  scaleBranchLengths(nodes, w) {
    // Visit all nodes and adjust y pos width distance metric
    var visitPreOrder = function (root, callback) {
      callback(root)
      if (root.children) {
        for (var i = root.children.length - 1; i >= 0; i--) {
          visitPreOrder(root.children[i], callback)
        };
      }
    }
    visitPreOrder(nodes[0], function (node) {
      node.rootDist = (node.parent
        ? node.parent.rootDist
        : 0) + (node.length || 0)
    })
    var rootDists = nodes.map(function (n) {
      return n.rootDist;
    });
    var yscale = d3
      .scale
      .linear()
      .domain([
        0, d3.max(rootDists)
      ])
      .range([0, w]);
    visitPreOrder(nodes[0], function (node) {
      node.y = yscale(node.rootDist)
    })
    return yscale
  }

  // Create Event Handlers for mouse
  handleMouseOver(d, i) {
    // Add interactivity Use D3 to select element, change color and size
    d3
      .select(this)
      .attr({
        fill: "orange",
        r: 5 * 2
      });
  }

  handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3
      .select(this)
      .attr({fill: "greenYellow", r: 5});
  }

  build() {
    const options = this.options || {}
    const selector = this.selector;
    let nodes = this.nodes;
    d3
      .select(selector)
      .select('svg')
      .remove();
    var w = options.width || d3
        .select(selector)
        .style('width') || d3
        .select(selector)
        .attr('width'),
      h = options.height || d3
        .select(selector)
        .style('height') || d3
        .select(selector)
        .attr('height'),
      w = parseInt(w),
      h = parseInt(h),
      radius = 4;
    var tree = options.tree || d3
      .layout
      .cluster()
      .size([h, w])
      .sort((node) => {
        return node.children
          ? node.children.length
          : -1;
      })
      .children(options.children || function (node) {
        return node.branchset
      });
    var diagonal = options.diagonal || this.rightAngleDiagonal();
    var vis = options.vis || d3
      .select(selector)
      .append("svg:svg")
      .attr("width", w + 300)
      .attr("height", h + 30)
      .append("svg:g")
      .attr("transform", "translate(20, 20)");
    nodes = tree(nodes);

    if (options.skipBranchLengthScaling) {
      var yscale = d3
        .scale
        .linear()
        .domain([0, w])
        .range([0, w]);
    } else {
      var yscale = this.scaleBranchLengths(nodes, w)
    }

    if (!options.skipTicks) {
      vis
        .selectAll('line')
        .data(yscale.ticks(10))
        .enter()
        .append('svg:line')
        .attr('y1', 0)
        .attr('y2', h)
        .attr('x1', yscale)
        .attr('x2', yscale)
        .attr("stroke", "#ddd");

      vis
        .selectAll("text.rule")
        .data(yscale.ticks(10))
        .enter()
        .append("svg:text")
        .attr("class", "rule")
        .attr("x", yscale)
        .attr("y", 0)
        .attr("dy", -3)
        .attr("text-anchor", "middle")
        .attr('font-size', '8px')
        .attr('fill', '#ccc')
        .text(function (d) {
          return Math.round(d * 100) / 100;
        });
    }
    var link = vis
      .selectAll("path.link")
      .data(tree.links(nodes))
      .enter()
      .append("svg:path")
      .attr("class", "link")
      .attr("d", diagonal)
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("stroke-width", "4px");

    var node = vis
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("svg:g")
      .attr("class", function (n) {
        if (n.children) {
          if (n.depth == 0) {
            return "root node"
          } else {
            return "inner node"
          }
        } else {
          return "leaf node"
        }
      })
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      })

    this.styleTreeNodes(vis)

    if (!options.skipLabels) {
      vis
        .selectAll('g.inner.node')
        .append("svg:text")
        .attr("dx", -6)
        .attr("dy", -6)
        .attr("text-anchor", 'end')
        .attr('font-size', '8px')
        .attr('fill', '#ccc')
        .text(function (d) {
          return d.length;
        });

      vis
        .selectAll('g.leaf.node')
        .append("svg:text")
        .attr("dx", 8)
        .attr("dy", 3)
        .attr("text-anchor", "start")
        .attr('font-family', 'Helvetica Neue, Helvetica, sans-serif')
        .attr('font-size', '10px')
        .attr('fill', 'black')
        .text(function (d) {
          return d.name;
        });
    }

    return {tree: tree, vis: vis}
  }
}
