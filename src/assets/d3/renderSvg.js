const data = {
  name: 'A1',
  children: [
    {
      name: 'B1',
      children: [
        {
          name: 'C1',
          value: 100,
        },
        {
          name: 'C2',
          value: 300,
        },
        {
          name: 'C3',
          value: 200,
        },
      ],
    },
    {
      name: 'B2',
      value: 200,
    },
  ],
};


const root = d3.hierarchy(data);
const treeLayout = d3.tree();
treeLayout.nodeSize([20, 20]);
treeLayout(root);

const margin = {
  top: 10, right: 10, bottom: 10, left: 70,
};
const width = 960 - margin.left - margin.right;
const height = 640 - margin.top - margin.bottom;

const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom);

svg.append('g').classed('nodes', true).attr('transform', `translate(${margin.left},${margin.top})`);
svg.append('g').classed('links', true).attr('transform', `translate(${margin.left},${margin.top})`);


d3.select('svg g.nodes')
  .selectAll('circle.node')
  .data(root.descendants())
  .enter()
  .append('circle')
  .classed('node', true)
  .attr('cx', (d) => d.x)
  .attr('cy', (d) => d.y)
  .attr('r', 2)
  .style('fill', 'blue');

// Links
d3.select('svg g.links')
  .selectAll('line.link')
  .data(root.links())
  .enter()
  .append('line')
  .classed('link', true)
  .attr('x1', (d) => d.source.x)
  .attr('y1', (d) => d.source.y)
  .attr('x2', (d) => d.target.x)
  .attr('y2', (d) => d.target.y)
  .style('stroke', 'black')
  .style('stroke-width', 1);

console.log('cuac');