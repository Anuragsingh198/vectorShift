from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Dict, List, Set

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses topological sort (Kahn's algorithm) to detect cycles.
    """
    if not edges:
        return True 
    node_ids = {node['id'] for node in nodes}
    adjacency: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    in_degree: Dict[str, int] = {node_id: 0 for node_id in node_ids}
    
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        if source in node_ids and target in node_ids:
            adjacency[source].append(target)
            in_degree[target] = in_degree.get(target, 0) + 1
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    processed = 0
    while queue:
        current = queue.pop(0)
        processed += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return processed == len(node_ids)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        is_dag_result = is_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag_result
        }
    except json.JSONDecodeError as e:
        return {'error': f'Invalid JSON: {str(e)}'}
    except Exception as e:
        return {'error': f'Error processing pipeline: {str(e)}'}
