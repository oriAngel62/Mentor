import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import toolbox from "../components/toolbox"
// export async function getStaticProps() {
// const allPostsData = getSortedPostsData();
// return {
//     props: {
//         allPostsData,
//     },
// };
//}

export default function Home({ allPostsData }) {
    return (
    <div>
    <Link href="./schedule">david</Link>
    <toolbox/>
    </div>
    );
}
