import { useState } from "react";

let idCounter = 1;

export default function App() {
  const [tree, setTree] = useState({
    id: 1,
    title: "Director",
    type: "director",
    path: "",
    childCounter: 0,
    memberCounter: 0,
    subordinateCounter: 0,
    children: [],
  });

  const addNode = (parentId) => {
    const updateTree = (node) => {
      if (node.id === parentId) {
        let newNode;

        if (node.type === "director") {
          const nextNumber = node.childCounter + 1;

          newNode = {
            id: ++idCounter,
            title: `Subordinate ${nextNumber}`,
            type: "subordinate",
            path: `${nextNumber}`,
            childCounter: 0,
            memberCounter: 0,
            subordinateCounter: 0,
            children: [],
          };
        } else {
          const nextNumber = node.childCounter + 1;

          newNode = {
            id: ++idCounter,
            title: `Branch Member ${node.path}/${nextNumber}`,
            type: "member",
            path: `${node.path}/${nextNumber}`,
            childCounter: 0,
            children: [],
          };
        }

        return {
          ...node,
          childCounter: node.childCounter + 1,
          children: [...node.children, newNode],
        };
      }

      return {
        ...node,
        children: node.children.map(updateTree),
      };
    };

    setTree(updateTree(tree));
  };

  const addBranchMember = (parentId) => {
    const updateTree = (node) => {
      if (node.id === parentId) {
        const nextNumber = node.memberCounter + 1;

        const member = {
          id: ++idCounter,
          title: `Branch Member ${node.path}/${nextNumber}`,
          type: "member",
          path: `${node.path}/${nextNumber}`,
          childCounter: 0,
          memberCounter: 0,
          subordinateCounter: 0,
          children: [],
        };

        return {
          ...node,
          memberCounter: nextNumber,
          children: [...node.children, member],
        };
      }

      return {
        ...node,
        children: node.children.map(updateTree),
      };
    };

    setTree(updateTree(tree));
  };

  const addSubBranchMember = (parentId) => {
    const updateTree = (node) => {
      if (node.id === parentId) {
        const nextNumber = node.memberCounter + 1;

        const member = {
          id: ++idCounter,
          title: `Branch Member ${node.path}/${nextNumber}`,
          type: "member",
          path: `${node.path}/${nextNumber}`,
          childCounter: 0,
          memberCounter: 0,
          subordinateCounter: 0,
          children: [],
        };

        return {
          ...node,
          memberCounter: nextNumber,
          children: [...node.children, member],
        };
      }

      return {
        ...node,
        children: node.children.map(updateTree),
      };
    };

    setTree(updateTree(tree));
  };

  const addSubordinateBranch = (parentId) => {
    const updateTree = (node) => {
      if (node.id === parentId) {
        const nextNumber = node.subordinateCounter + 1;

        const subordinate = {
          id: ++idCounter,
          title: `Subordinate ${node.path}/${nextNumber}`,
          type: "subordinate",
          path: `${node.path}/${nextNumber}`,
          childCounter: 0,
          memberCounter: 0,
          subordinateCounter: 0,
          children: [],
        };

        return {
          ...node,
          subordinateCounter: nextNumber,
          children: [...node.children, subordinate],
        };
      }

      return {
        ...node,
        children: node.children.map(updateTree),
      };
    };

    setTree(updateTree(tree));
  };

  const deleteNode = (nodeId) => {
    const removeNode = (node) => ({
      ...node,
      children: node.children
        .filter((child) => child.id !== nodeId)
        .map(removeNode),
    });

    setTree(removeNode(tree));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-center text-4xl font-bold mb-10">
        Organizational Structure
      </h1>

      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg border border-gray-300">
        <div className="flex justify-center">
          <TreeNode
            node={tree}
            addNode={addNode}
            addBranchMember={addBranchMember}
            addSubordinateBranch={addSubordinateBranch}
            addSubBranchMember={addBranchMember}
            deleteNode={deleteNode}
            isRoot
          />
        </div>
      </div>
    </div>
  );
}

function TreeNode({
  node,
  addNode,
  addBranchMember,
  addSubordinateBranch,
  addSubBranchMember,
  deleteNode,
  isRoot = false,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const members = node.children.filter((child) => child.type === "member");

  const subordinates = node.children.filter(
    (child) => child.type === "subordinate"
  );

  return (
    <div className="w-full">
      <div className="border-2 border-gray-300 rounded-lg bg-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{node.title}</h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {node.type === "subordinate" && (
                <button
                  onClick={() => addBranchMember(node.id)}
                  className="w-7 h-7 rounded-full bg-green-500 text-white font-bold"
                >
                  +
                </button>
              )}

              {!isRoot && (
                <button
                  onClick={() => deleteNode(node.id)}
                  className="w-7 h-7 rounded-full bg-red-500 text-white font-bold"
                >
                  -
                </button>
              )}
            </div>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-xl font-bold px-2"
            >
              ⋮
            </button>
          </div>
        </div>

        {showMenu && (
          <div className="mt-4 flex flex-col gap-2">
            {node.type === "director" && (
              <button
                onClick={() => {
                  addNode(node.id);
                  setShowMenu(false);
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                Add New Subordinate Branch
              </button>
            )}

            {node.type === "subordinate" && (
              <button
                onClick={() => {
                  addSubordinateBranch(node.id);
                  setShowMenu(false);
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded"
              >
                Add Subordinate Branch
              </button>
            )}

            {node.type === "member" && (
              <button
                onClick={() => {
                  addSubBranchMember(node.id);
                  setShowMenu(false);
                }}
                className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
              >
                Add Sub Branch Member
              </button>
            )}
          </div>
        )}
      </div>

      {node.children.length > 0 && (
        <div className="mt-4 border border-gray-300 rounded-lg p-4">
          <div
            className={
              isRoot ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"
            }
          >
            {members.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                addNode={addNode}
                addBranchMember={addBranchMember}
                addSubordinateBranch={addSubordinateBranch}
                addSubBranchMember={addSubBranchMember}
                deleteNode={deleteNode}
              />
            ))}

            {subordinates.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                addNode={addNode}
                addBranchMember={addBranchMember}
                addSubordinateBranch={addSubordinateBranch}
                addSubBranchMember={addSubBranchMember}
                deleteNode={deleteNode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
