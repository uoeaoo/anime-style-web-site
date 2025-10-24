import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./MainMore.css";

function ExpandablePanel({
  title,
  children,
  expanded,
  onToggle,
  moreLabel,
  lessLabel,
}) {
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    if (!wrap || !content) return;

    wrap.classList.toggle("is-expanded", expanded);

    if (prefersReduced) {
      content.style.maxHeight = expanded ? "none" : "120px";
      return;
    }

    if (expanded) {
      content.style.maxHeight = content.scrollHeight + "px";
      const id = setTimeout(() => {
        if (wrap.classList.contains("is-expanded")) {
          content.style.maxHeight = "2000px";
        }
      }, 350);
      return () => clearTimeout(id);
    } else {
      content.style.maxHeight = Math.min(content.scrollHeight, 2000) + "px";
      requestAnimationFrame(() => {
        content.style.maxHeight = "160px";
      });
    }
  }, [expanded, prefersReduced]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    if (!wrap || !content) return;

    const onResize = () => {
      if (wrap.classList.contains("is-expanded") && !prefersReduced) {
        content.style.maxHeight = content.scrollHeight + "px";
        const id = setTimeout(() => {
          if (wrap.classList.contains("is-expanded")) {
            content.style.maxHeight = "2000px";
          }
        }, 200);
        return () => clearTimeout(id);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [prefersReduced]);

  const contentId = "expandableContent";

  return (
    <div className="expandable panel reveal-up" ref={wrapRef}>
      <h3 className="expandable-title">{title}</h3>

      <div
        id={contentId}
        className="expandable-content"
        ref={contentRef}
        aria-hidden={!expanded}
      >
        {children}
      </div>

      <div className="row end">
        <button
          className="expandable-toggle btn ghost"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={onToggle}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      </div>
    </div>
  );
}

ExpandablePanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  moreLabel: PropTypes.string.isRequired,
  lessLabel: PropTypes.string.isRequired,
};

export default ExpandablePanel;
