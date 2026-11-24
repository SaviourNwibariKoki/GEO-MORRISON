import { GlossaryTerm } from '../types/geology';

export const STARTER_GLOSSARY: GlossaryTerm[] = [
  {
    id: 't-1',
    term: 'Anticline',
    category: 'Structural Geology',
    technicalDefinition: 'A fold that is convex upward, with older strata core layers exposed in the center of the fold hinge after erosion.',
    simpleExplanation: 'An arch-shaped fold in rock layers where the oldest rocks are found at the core.',
    example: 'Folded sedimentary sequences in mountain belts such as the Jura Mountains.',
    relatedTerms: ['Syncline', 'Fold axis', 'Plunge', 'Limbs']
  },
  {
    id: 't-2',
    term: 'Diagenesis',
    category: 'Sedimentology',
    technicalDefinition: 'All chemical, physical, and biological changes undergone by a sediment after its initial deposition and during and after its lithification, excluding metamorphism.',
    simpleExplanation: 'The physical and chemical processes that turn loose sand and mud into solid sedimentary rock over time.',
    example: 'Cementation of quartz sand grains by precipitated silica to form quartz arenite.',
    relatedTerms: ['Lithification', 'Compaction', 'Cementation', 'Porosity']
  },
  {
    id: 't-3',
    term: 'Facies',
    category: 'Stratigraphy',
    technicalDefinition: 'The total characteristic features of a sedimentary rock, including its mineral composition, texture, and structures, reflecting the environmental conditions of its deposition.',
    simpleExplanation: 'The distinct physical and biological characteristics of a rock layer that tell us what environment it formed in.',
    example: 'Turbidite facies representing deep-water submarine fan deposition.',
    relatedTerms: ['Lithofacies', 'Biofacies', 'Walther\'s Law', 'Depositional environment']
  },
  {
    id: 't-4',
    term: 'Cleavage',
    category: 'Structural Geology',
    technicalDefinition: 'The tendency of a rock to split along secondary planar fabric elements formed under directed pressure during deformation and metamorphism.',
    simpleExplanation: 'The parallel planes along which a deformed metamorphic rock easily breaks.',
    example: 'Slate cleavage cutting across bedding planes in low-grade pelitic rocks.',
    relatedTerms: ['Foliation', 'Schistosity', 'Slaty cleavage', 'Strain']
  },
  {
    id: 't-5',
    term: 'Mohs Hardness Scale',
    category: 'Mineralogy',
    technicalDefinition: 'A qualitative ordinal scale characterizing scratch resistance of various minerals through the ability of a harder material to scratch a softer material.',
    simpleExplanation: 'A standard 1 to 10 scale used by geologists to rank mineral hardness by scratch testing.',
    example: 'Quartz (7) scratches fluorite (4) but cannot scratch topaz (8).',
    relatedTerms: ['Mineral tenacity', 'Scratch test', 'Hardness', 'Crystal structure']
  },
  {
    id: 't-6',
    term: 'Unconformity',
    category: 'Stratigraphy',
    technicalDefinition: 'A surface of erosion or non-deposition separating younger strata from older rocks, representing a significant hiatus in the geological record.',
    simpleExplanation: 'A buried gap in the geological rock record representing a period of erosion or non-deposition.',
    example: 'Angular unconformity where tilted older beds are overlain by flat-lying younger strata.',
    relatedTerms: ['Disconformity', 'Nonconformity', 'Hiatus', 'Stratigraphic column']
  },
  {
    id: 't-7',
    term: 'Phenocryst',
    category: 'Petrology',
    technicalDefinition: 'A relatively large and conspicuous crystal set in a finer-grained groundmass or matrix of an igneous rock.',
    simpleExplanation: 'Larger, well-formed crystals floating in a finer volcanic or igneous rock background.',
    example: 'Large potassium feldspar crystals in a porphyritic granite or rhyolite.',
    relatedTerms: ['Porphyritic', 'Groundmass', 'Igneous texture', 'Cooling history']
  },
  {
    id: 't-8',
    term: 'Vector Data',
    category: 'GIS',
    technicalDefinition: 'A spatial data model using points, lines, and polygons with coordinate pairs to represent discrete geographic features.',
    simpleExplanation: 'Digital map data represented by exact geographic coordinates forming points, lines, and polygons.',
    example: 'Fault lines, borehole locations, and geological outcrop polygon boundaries.',
    relatedTerms: ['Raster data', 'Coordinate reference system', 'Attribute table', 'Shapefile']
  },
  {
    id: 't-9',
    term: 'Raster Data',
    category: 'GIS',
    technicalDefinition: 'A spatial data model comprising a matrix of cells or pixels organized into rows and columns, where each cell stores a numeric attribute value.',
    simpleExplanation: 'Grid-based map data made of pixels, commonly used for elevation models or satellite imagery.',
    example: 'Digital Elevation Models (DEMs) and satellite multispectral reflectance grids.',
    relatedTerms: ['Vector data', 'Pixel resolution', 'DEM', 'Spatial analysis']
  },
  {
    id: 't-10',
    term: 'Walther\'s Law',
    category: 'Stratigraphy',
    technicalDefinition: 'The principle stating that facies occurring in conformable vertical succession were deposited in adjacent depositional environments side-by-side.',
    simpleExplanation: 'Vertical stacks of rock layers reflect environments that once existed side-by-side horizontally.',
    example: 'Beach sandstone overlain conformably by lagoonal mudstone and swamp coal.',
    relatedTerms: ['Facies', 'Transgression', 'Regression', 'Stratigraphic succession']
  }
];
