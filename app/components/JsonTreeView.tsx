import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useEffect, useRef } from "react";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "~/hooks/useJsonColumnView";
import { useJsonDoc } from "~/hooks/useJsonDoc";
import { JsonTreeViewNode, useJsonTreeViewContext } from "~/hooks/useJsonTree";
import { VirtualNode } from "~/hooks/useVirtualTree";
import { CopySelectedNodeShortcut } from "./CopySelectedNode";
import { Body } from "./Primitives/Body";
import { Mono } from "./Primitives/Mono";

export function JsonTreeView() {
  const { selectedNodeId, selectedNodeSource } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();

  const { tree, parentRef } = useJsonTreeViewContext();

  // Scroll to the selected node when this component is first rendered.
  const scrolledToNodeRef = useRef(false);

  useEffect(() => {
    if (!scrolledToNodeRef.current && selectedNodeId) {
      tree.scrollToNode(selectedNodeId);
      scrolledToNodeRef.current = true;
    }
  }, [selectedNodeId, scrolledToNodeRef]);

  // Yup, this is hacky.
  // This is to prevent the selection not changing the first time you try to move to a new node in the tree
  const focusCount = useRef<number>(0);

  // This focuses and scrolls to the selected node when the selectedNodeId
  // is set from a source other than this tree (e.g. the search bar, path bar, related values).
  useEffect(() => {
    if (
      tree.focusedNodeId &&
      selectedNodeId &&
      tree.focusedNodeId !== selectedNodeId
    ) {
      if (selectedNodeId === "$") {
        return;
      }

      if (selectedNodeSource !== "tree" && focusCount.current > 0) {
        focusCount.current = focusCount.current + 1;
        tree.focusNode(selectedNodeId);
        tree.scrollToNode(selectedNodeId);
      }
    }
  }, [tree.focusedNodeId, goToNodeId, selectedNodeId, selectedNodeSource]);

  // This is what syncs the tree view's focused node to the column view selected node
  const previousFocusedNodeId = useRef<string | null>(null);

  useEffect(() => {
    let updated = false;

    if (!previousFocusedNodeId.current) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      updated = true;
    }

    if (
      tree.focusedNodeId &&
      (updated || previousFocusedNodeId.current !== tree.focusedNodeId)
    ) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      goToNodeId(tree.focusedNodeId, "tree");
    }
  }, [previousFocusedNodeId, tree.focusedNodeId, tree.focusNode, goToNodeId]);

  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.focus({ preventScroll: true });
    }
  }, [treeRef.current]);

  const { minimal } = useJsonDoc();

  return (
    <>
      <CopySelectedNodeShortcut />
      <div
        className="text-white w-full"
        ref={parentRef}
        style={{
          height: `calc(100vh - ${minimal ? "66px" : "106px"})`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div
          className="relative w-full outline-none"
          style={{ height: `${tree.totalSize}px` }}
          {...tree.getTreeProps()}
          ref={treeRef}
        >
          {tree.nodes.map((virtualNode) => (
            <TreeViewNode
              virtualNode={virtualNode}
              key={virtualNode.node.id}
              onToggle={(node, e) => tree.toggleNode(node.id, e)}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function TreeViewNode({
  virtualNode,
  onToggle,
  selectedNodeId,
}: {
  virtualNode: VirtualNode<JsonTreeViewNode>;
  selectedNodeId?: string;
  onToggle?: (node: JsonTreeViewNode, e: MouseEvent) => void;
}) {
  const { node, virtualItem, depth } = virtualNode;

  const indentClassName = computeTreeNodePaddingClass(depth);

  const isSelected = selectedNodeId === node.id;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${virtualNode.size}px`,
        transform: `translateY(${virtualNode.start}px)`,
      }}
      key={virtualNode.node.id}
      {...virtualNode.getItemProps()}
    >
      <div
        className={`h-full flex pl-5 rounded-sm select-none ${
          isSelected
            ? "bg-gradient-to-r from-cyan-50 to-emerald-50 dark:from-slate-700 dark:to-slate-700 border-l-4 border-cyan-300 dark:border-emerald-400"
            : virtualItem.index % 2
            ? "bg-slate-50 dark:bg-slate-800/50"
            : "bg-white dark:bg-slate-900/50"
        }`}
      >
        <div className={`pl-2 w-2/6 items-center flex`}>
          {node.children && node.children.length > 0 && (
            <span
              onClick={(e) => {
                if (onToggle) {
                  e.preventDefault();
                  onToggle(node, e.nativeEvent);
                }
              }}
            >
              {virtualNode.isCollapsed ? (
                <ChevronRightIcon
                  className={`w-4 h-4 mr-1 -ml-5  ${
                    isSelected
                      ? "text-cyan-600 dark:text-emerald-300"
                      : "text-slate-400 dark:text-slate-400"
                  }`}
                />
              ) : (
                <ChevronDownIcon
                  className={`w-4 h-4 mr-1 -ml-5 ${
                    isSelected
                      ? "text-cyan-600 dark:text-emerald-300"
                      : "text-slate-400 dark:text-slate-400"
                  }`}
                />
              )}
            </span>
          )}

          <Body
            className={`${indentClassName} leading-8 truncate whitespace-nowrap pl-2 pr-2 ${
              isSelected
                ? "text-cyan-700 dark:text-emerald-100 font-medium"
                : "text-slate-700 dark:text-slate-300"
            }`}
          >
            {node.longTitle ?? node.name}
          </Body>
        </div>

        <div className="flex w-4/6 items-center">
          <span className="mr-2">
            {node.icon && (
              <node.icon
                className={`h-5 w-5 ${
                  isSelected
                    ? "text-cyan-600 dark:text-emerald-300"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              />
            )}
          </span>
          {node.subtitle && (
            <Mono
              className={`truncate pr-1 transition ${
                isSelected
                  ? "text-cyan-600 dark:text-emerald-200"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {node.subtitle}
            </Mono>
          )}
        </div>
      </div>
    </div>
  );
}

function computeTreeNodePaddingClass(depth: number) {
  switch (depth) {
    case 0:
      return "ml-[4px] border-l border-slate-300/70 dark:border-slate-600/70";
    case 1:
      return "ml-[calc(12px_+_4px)] border-l border-cyan-200/70 dark:border-cyan-600/30";
    case 2:
      return "ml-[calc(12px_*_2_+_4px)] border-l border-emerald-200/70 dark:border-emerald-600/30";
    case 3:
      return "ml-[calc(12px_*_3_+_4px)] border-l border-amber-200/70 dark:border-amber-600/30";
    case 4:
      return "ml-[calc(12px_*_4_+_4px)] border-l border-violet-200/70 dark:border-violet-600/30";
    case 5:
      return "ml-[calc(12px_*_5_+_4px)] border-l border-rose-200/70 dark:border-rose-600/30";
    case 6:
      return "ml-[calc(12px_*_6_+_4px)] border-l border-cyan-200/70 dark:border-cyan-600/30";
    case 7:
      return "ml-[calc(12px_*_7_+_4px)] border-l border-emerald-200/70 dark:border-emerald-600/30";
    case 8:
      return "ml-[calc(12px_*_8_+_4px)] border-l border-amber-200/70 dark:border-amber-600/30";
    case 9:
      return "ml-[calc(12px_*_9_+_4px)] border-l border-violet-200/70 dark:border-violet-600/30";
    case 10:
      return "ml-[calc(12px_*_10_+_4px)] border-l border-rose-200/70 dark:border-rose-600/30";
    default:
      return "ml-[calc(12px_*_11_+_4px)] border-l border-slate-300/70 dark:border-slate-600/70";
  }
}
