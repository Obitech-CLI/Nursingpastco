import Image from "next/image";
import styles from "./page.module.css";
import HeroImage from "@/public/hero.png";
import InstituitionsHero from "@/public/InstituitionLogo.jpeg";
import {
  Book,
  Brain,
  CalendarCheck2,
  ChartColumnIncreasingIcon,
  ClipboardList,
  Clock3,
  FileCheck2,
  Files,
  LibraryBig,
  Link2,
  Newspaper,
  PenBox,
  School,
  Stethoscope,
  StethoscopeIcon,
  TrendingUp,
  Unlock,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className={styles.hero}>
        <Image src={HeroImage} alt="" loading="eager" />
        <h1>study for your nursing level exams with confidence.</h1>
      </div>
      <div className={styles.offer}>
        <section>
          <h3>
            we <span>offer</span>
          </h3>
          <h2>all african nursing</h2>
        </section>

        <div>
          <h3>
            <span>
              <Files size={35} color="orange" />
            </span>
            past questions
          </h3>
          <p>
            we provide examination past questions from different nursing
            insttuitions.
          </p>
          <Link href="/">
            past questions <Link2 />
          </Link>
        </div>

        <div>
          <h3>
            <span>
              <PenBox size={35} color="blue" />
            </span>
            contents
          </h3>
          <p>
            we post updated content about nursing related events like jobs,
            certifications etc.
          </p>
          <Link href="/">
            nursing contents
            <Link2 />
          </Link>
        </div>

        <div>
          <h3>
            <span>
              <Newspaper size={35} color="teal" />
            </span>
            news & updates
          </h3>
          <p>
            we keep you informed on updates with early information in the
            nursing fields.
          </p>

          <Link href="/">
            news and updates
            <Link2 />
          </Link>
        </div>

        <div>
          <h3>
            <span>
              <LibraryBig size={35} color="brown" />
            </span>
            recommendations
          </h3>
          <p>we recommend career development and essential tools.</p>

          <Link href="/recommendations">
            recommendations
            <Link2 />
          </Link>
        </div>
      </div>
      <div className={styles.instituitionsHero}>
        <h2>we cover a wide range of nursing instituitions across africa</h2>
        <Image src={InstituitionsHero} alt="" />
        <Link href="">
          available instituitions <Link2 />
        </Link>
        <div>
          more than
          <br />
          <span style={{ color: "red" }}>200,000</span>
          <br />
          monthly reads
          <br />
          from
          <br />
          <span style={{ color: "lightblue" }}>nursing students</span>
        </div>
      </div>
      <div className={styles.sub_offer}>
        <p>
          Our site provides verified, legitimate and accurate data to help and
          guide you on your path towards a successful nursing career.
        </p>
        <div>
          <div>
            <div className={styles.card1}>
              <div className="overlay"></div>
              <h2>
                study real
                <br />
                past questions
              </h2>
              <ul>
                <li>
                  <span>
                    <ClipboardList />
                  </span>
                  <h4>
                    exam
                    <br />
                    focused
                  </h4>
                </li>
                <li>
                  <span>
                    <Brain />
                  </span>
                  <h4>
                    better
                    <br />
                    preparation
                  </h4>
                </li>
                <li>
                  <span>
                    <ChartColumnIncreasingIcon />
                  </span>
                  <h4>
                    higher
                    <br />
                    success
                  </h4>
                </li>
              </ul>
            </div>
            <p>
              We provide nursing students access to real examination past
              questions to help them understand exam patterns, identify
              important topics and practice under exam focused conditions for
              better exam confidence and practices from past examinations.
            </p>
          </div>

          <div>
            <div className={styles.card2}>
              <div className="overlay"></div>
              <h2>
                get regularly
                <br />
                updated contents
              </h2>
              <ul>
                <li>
                  <span>
                    <CalendarCheck2 />
                  </span>
                  <h4>
                    frequent
                    <br />
                    updates
                  </h4>
                </li>
                <li>
                  <span>
                    <FileCheck2 />
                  </span>
                  <h4>
                    accurate
                    <br />
                    and reliable
                  </h4>
                </li>
                <li>
                  <span>
                    <Clock3 />
                  </span>
                  <h4>
                    stay
                    <br />
                    ahead
                  </h4>
                </li>
              </ul>
            </div>

            <p>
              We provide nursing students with regularly updated educational
              nursing contents including course tutorials, notes, clinical
              guidelines, study materials, quiz etc, for improving knowledge,
              studying and better examination preparations.
            </p>
          </div>

          <div>
            <div className={styles.card3}>
              <div className="overlay"></div>
              <h2>
                Nursing
                <br />
                News & Updates
              </h2>
              <ul>
                <li>
                  <span>
                    <School />
                  </span>
                  <h4>
                    school
                    <br />
                    updates
                  </h4>
                </li>
                <li>
                  <span>
                    <Newspaper />
                  </span>
                  <h4>
                    nursing &<br />
                    healthcare news
                  </h4>
                </li>
                <li>
                  <span>
                    <Stethoscope />
                  </span>
                  <h4>
                    nursing
                    <br />
                    practices
                  </h4>
                </li>
              </ul>
            </div>
            <p>
              We are dedicated to bringing you important nursing and healthcare
              news, school updates, examination information, registration
              deadlines etc, to keep students informed and ensure they don't
              miss important opportunities or developments in nursing.
            </p>
          </div>

          <div>
            <div className={styles.card4}>
              <div className="overlay"></div>
              <h2>
                Nursing
                <br />
                Recommendations
              </h2>
              <ul>
                <li>
                  <span>
                    <TrendingUp />
                  </span>
                  <h4>
                    career
                    <br />
                    development
                  </h4>
                </li>
                <li>
                  <span>
                    <Book />
                  </span>
                  <h4>
                    useful
                    <br />
                    resource
                  </h4>
                </li>
                <li>
                  <span>
                    <StethoscopeIcon />
                  </span>
                  <h4>
                    clinical
                    <br />
                    guidance
                  </h4>
                </li>
              </ul>
            </div>
            <p>
              We provide nursing students with useful recommendations on study
              methods, clinical practice, nursing resources, career development
              and essential tools to guide you on the right path or choices to
              make as you progress higher in nursing related fields.
            </p>
          </div>
        </div>
        <h3>
          <Unlock color="tomato" size={40} />
          100% free access
        </h3>
      </div>
    </main>
  );
}
