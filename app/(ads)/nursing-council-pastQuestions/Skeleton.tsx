"use client";
import "./style.css";

export function CoursesSkeleton() {
  return (
    <div className="skeleton courses">
      <div className="h3"></div>
      <div className="h4"></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export function CountriesSkeleton() {
  return (
    <div className="skeleton countries">
      <div className="h3"></div>
      <section>
        <div className="cname"></div>
        <div className="img"></div>
        <div className="btn"></div>
      </section>
      <section>
        <div className="cname"></div>
        <div className="img"></div>
        <div className="btn"></div>
      </section>
    </div>
  );
}
