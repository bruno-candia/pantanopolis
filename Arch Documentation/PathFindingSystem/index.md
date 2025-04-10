# Pathfinding System in Auride Defense

## Overview of Pathfinding

Inspired by Rogue Tower, our pathfinding system implements a dynamic approach where paths are progressively constructed each round rather than being fixed from the start. This creates unpredictability and adds strategic depth to gameplay.

## Map Structure and Progressive Path Generation

The map is structured as a grid with:
- Path segments (roads) that enemies traverse
- Surrounding terrain areas where players place towers
- Core/castle (player's main defense)
- Enemy spawn points/portals

### Progressive Generation Process

1. **Start at the Core:** Begin at the tile where the core/castle is located
2. **Track Open Ends:** Maintain a list of current path endpoints that can be expanded
3. **Expansion Each Round:** Each new round, select an open end to expand 
4. **Path Variation:** Create straight paths, curves, or forks based on game logic
5. **Validity Checks:** Ensure paths don't create invalid loops or exceed map boundaries
6. **Fork Creation:** At certain moments, create path forks (T-junctions) that offer multiple expansion directions
7. **Portal Placement:** Add enemy spawn portals at the end of certain paths

This iterative process creates a branched maze structure forming a tree where:
- The core is the root
- The portals are leaves
- No loops exist (tree structure)

## Pathfinding Algorithm Implementation

Since paths are predetermined by the generation process, enemies essentially follow the generated roads. The implementation uses:

### Algorithm Options:
- **Simple Path Following:** For basic enemy movement along predetermined paths
- **Breadth-First Search (BFS):** For finding shortest paths through the road network
- **A* Algorithm:** For more complex enemy behavior with pathfinding costs

### Data Structures:
- **2D Grid Array:** Represents the map layout
- **Tree Structure:** Represents the path network (core → branches → portals)
- **Queue/Priority Queue:** For algorithm implementation

## Integration with Game Systems

The pathfinding system connects to:
- **Fog of War:** Newly revealed tiles may extend paths
- **Difficulty System:** More complex paths at higher difficulties
- **Wave System:** Path extension triggered by wave completion
- **Tower Placement:** Strategic placement influenced by path development

## Technical Implementation

The system is implemented through several key classes:
- `TileGeneration`: Handles individual tile creation and properties
- `PathFinder`: Implements algorithms for path calculation and enemy movement
- `MapGeneration`: Orchestrates the overall map creation process
