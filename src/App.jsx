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
            isNew: true,
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
            isNew: true,
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
          isNew: true,
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
          isNew: true,
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
          isNew: true,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-8">
      <h1 className="text-center text-4xl font-bold mb-10">
        Organizational Structure
      </h1>

      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border">
        <div className="flex justify-center">
          <TreeNode
            node={tree}
            addNode={addNode}
            addBranchMember={addBranchMember}
            addSubordinateBranch={addSubordinateBranch}
            addSubBranchMember={addSubBranchMember}
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

  const styles = {
    director: {
      card: `
      bg-gradient-to-br
      from-slate-900
      via-slate-800
      to-slate-700
      text-white
      border-slate-600
      
    `,
      container: "bg-slate-50 border-slate-200",
      icon: "👔",
    },

    subordinate: {
      card: `
      bg-gradient-to-br
      from-emerald-600
      via-emerald-700
      to-teal-700
      text-white
      border-emerald-500
    `,
      container: "bg-emerald-50 border-emerald-200",
      icon: "🧑‍💼",
    },

    member: {
      card: `
      bg-gradient-to-br
      from-white
      to-slate-50
      text-slate-800
      border-slate-200
    `,
      container: "bg-slate-50 border-slate-200",
      icon: "👤",
    },
  };

  const style = styles[node.type];

  return (
    <div className="w-full">
      <div
        className={`relative overflow-hidden border rounded-3xl p-5 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
          ${style.card}
          ${node.isNew ? "new-node glow-new ring-4 ring-yellow-300" : ""}
        `}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg">
              {style.icon}
            </div>

            <div>
              <h3 className="font-bold text-lg">{node.title}</h3>
              <p className="text-sm opacity-80">{node.type.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {node.type === "subordinate" && (
              <button
                onClick={() => addBranchMember(node.id)}
                className="w-8 h-8 rounded-full text-xl flex justify-center bg-white text-green-600 font-bold shadow-md hover:scale-110 transition cursor-pointer"
              >
                +
              </button>
            )}

            {!isRoot && (
              <button
                onClick={() => deleteNode(node.id)}
                className="w-8 h-8 rounded-full text-xl flex justify-center bg-red-500 text-white font-bold shadow-md hover:scale-110 transition cursor-pointer"
              >
                −
              </button>
            )}

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-2xl px-2 font-bold hover:bg-white/20 rounded-md cursor-pointer"
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
                className="bg-white text-blue-700 rounded-lg px-4 py-2 font-medium hover:bg-blue-50 cursor-pointer"
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
                className="bg-white text-green-700 rounded-lg px-4 py-2 font-mediumhover:bg-green-50 cursor-pointer"
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
                className="bg-white text-orange-700 rounded-lg px-4 py-2 font-medium hover:bg-orange-50 cursor-pointer"
              >
                Add Sub Branch Member
              </button>
            )}
          </div>
        )}
      </div>

      {node.children.length > 0 && (
        <div className="mt-5">
          <div className={`p-5 ${style.container}`}>
            <div
              className={
                isRoot ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"
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
                <div
                  key={child.id}
                  className="border-2 border-green-300 rounded-2xl bg-white/80 p-4 shadow-md hover:shadow-lg transition-all"
                >
                  <TreeNode
                    node={child}
                    addNode={addNode}
                    addBranchMember={addBranchMember}
                    addSubordinateBranch={addSubordinateBranch}
                    addSubBranchMember={addSubBranchMember}
                    deleteNode={deleteNode}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
