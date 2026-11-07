"use client";

import "./instituitions.css";

export function InstituitionSkeleton() {
  return (
    <div className="skeleton instituitions">
      <section>
        <div className="abbr"></div>
        <div className="img"></div>
        <div className="iname"></div>
        <div className="about"></div>
        <section className="btns">
          <div></div>
          <div></div>
        </section>
      </section>

      <section>
        <div className="abbr"></div>
        <div className="img"></div>
        <div className="iname"></div>
        <div className="about"></div>
        <section className="btns">
          <div></div>
          <div></div>
        </section>
      </section>

      <section>
        <div className="abbr"></div>
        <div className="img"></div>
        <div className="iname"></div>
        <div className="about"></div>
        <section className="btns">
          <div></div>
          <div></div>
        </section>
      </section>
    </div>
  );
}
