import Head from "next/head";
// import Date from "../../components/date";
// import utilStyles from "../../styles/utils.module.css";
import Table from "react-bootstrap/Table";
import Toolbox from "../components/toolbox";
import data from "../HardCodedData/Schedule.json";
// import day from "../components/day";
//query to data
export async function getStaticProps({ params }) {
    return {
        props: {
            data,
        },
    };
}

// for(int i=0; i<7; i++){
//     <day/>
// }

export default function Post({ data }) {
    console.log(data);
    return (
        <div>
            <Table striped bordered hover>
                <tbody>
                    <tr></tr>
                    <tr></tr>
                </tbody>
            </Table>
        </div>
    );
}
